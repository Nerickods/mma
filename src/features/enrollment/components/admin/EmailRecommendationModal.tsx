'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCopy, FaCheck, FaUserCheck, FaEnvelope, FaRobot, FaGlobe } from 'react-icons/fa';
import { SavedEnrollment } from '../../services/enrollmentServerService';
import { generateEmailForEnrollment, getFullEmailText } from '../../utils/emailTemplates';

interface EmailRecommendationModalProps {
    isOpen: boolean;
    onClose: () => void;
    enrollment: SavedEnrollment | null;
    onContactedSuccess: (updatedEnrollment: SavedEnrollment) => void;
}

export default function EmailRecommendationModal({
    isOpen,
    onClose,
    enrollment,
    onContactedSuccess
}: EmailRecommendationModalProps) {
    const [emailContent, setEmailContent] = useState('');
    const [contactedBy, setContactedBy] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Generate email when enrollment changes
    useEffect(() => {
        if (enrollment) {
            const template = generateEmailForEnrollment(enrollment);
            setEmailContent(getFullEmailText(template));
            setContactedBy('');
            setError(null);
        }
    }, [enrollment]);

    // Handle copy to clipboard
    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(emailContent);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }, [emailContent]);

    // Handle mark as contacted
    const handleMarkContacted = useCallback(async () => {
        if (!enrollment || !contactedBy.trim()) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`/api/enrollments/${enrollment.id}/mark-contacted`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contacted_by: contactedBy.trim() }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Error al marcar como contactado');
            }

            const updatedEnrollment = await response.json();
            onContactedSuccess(updatedEnrollment);
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setIsSubmitting(false);
        }
    }, [enrollment, contactedBy, onContactedSuccess, onClose]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, onClose]);

    if (!enrollment) return null;

    const isChatAgent = enrollment.source === 'chat_agent';
    const canMarkContacted = contactedBy.trim().length > 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] md:max-h-[85vh] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-black/5 dark:border-white/10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/10 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl ${isChatAgent ? 'bg-gradient-to-br from-amber-400 to-red-500' : 'bg-blue-500'}`}>
                                    {isChatAgent ? (
                                        <FaRobot className="text-white text-lg" />
                                    ) : (
                                        <FaGlobe className="text-white text-lg" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-amber-900 dark:text-white">
                                        Recomendación de Email
                                    </h3>
                                    <p className="text-xs text-amber-900/60 dark:text-white/50">
                                        {isChatAgent ? 'Lead del Asistente IA' : 'Lead del Formulario Web'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            >
                                <FaTimes className="text-amber-900/60 dark:text-white/60" />
                            </button>
                        </div>

                        {/* Lead Info */}
                        <div className="p-4 bg-amber-50/50 dark:bg-white/5 border-b border-black/5 dark:border-white/10">
                            <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-2 text-amber-900 dark:text-white font-medium">
                                    <FaEnvelope className="text-amber-500" />
                                    {enrollment.name}
                                </span>
                                <span className="text-amber-900/50 dark:text-white/50">
                                    {enrollment.email}
                                </span>
                            </div>
                        </div>

                        {/* Email Content */}
                        <div className="flex-1 p-4 overflow-auto">
                            <label className="block text-xs font-bold text-amber-900/60 dark:text-white/40 uppercase tracking-wider mb-2">
                                Copy del Email (editable)
                            </label>
                            <textarea
                                value={emailContent}
                                onChange={(e) => setEmailContent(e.target.value)}
                                className="w-full h-64 p-4 bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-sm text-amber-900 dark:text-white/90 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-mono"
                                placeholder="El contenido del email aparecerá aquí..."
                            />

                            {/* Copy Button */}
                            <div className="mt-3 flex justify-end">
                                <button
                                    onClick={handleCopy}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${isCopied
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-500/30'
                                        }`}
                                >
                                    {isCopied ? (
                                        <>
                                            <FaCheck /> ¡Copiado!
                                        </>
                                    ) : (
                                        <>
                                            <FaCopy /> Copiar Todo
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Footer - Mark as Contacted */}
                        <div className="p-4 border-t border-black/5 dark:border-white/10 bg-zinc-50 dark:bg-black/20">
                            {error && (
                                <div className="mb-3 p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm rounded-lg">
                                    {error}
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-amber-900/60 dark:text-white/40 uppercase tracking-wider mb-1">
                                        Contactado por
                                    </label>
                                    <input
                                        type="text"
                                        value={contactedBy}
                                        onChange={(e) => setContactedBy(e.target.value)}
                                        placeholder="Ingresa tu nombre..."
                                        className="w-full px-3 py-2 bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-lg text-sm text-amber-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button
                                        onClick={handleMarkContacted}
                                        disabled={!canMarkContacted || isSubmitting}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${canMarkContacted && !isSubmitting
                                                ? 'bg-gradient-to-r from-amber-400 to-red-500 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40'
                                                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
                                            }`}
                                    >
                                        <FaUserCheck />
                                        {isSubmitting ? 'Guardando...' : 'Marcar Contactado'}
                                    </button>
                                </div>
                            </div>

                            {!canMarkContacted && (
                                <p className="mt-2 text-xs text-amber-900/40 dark:text-white/30">
                                    Ingresa tu nombre para habilitar el botón
                                </p>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
