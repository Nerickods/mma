'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { enrollmentService } from '../services/enrollmentService';
import { EnrollmentData } from '../types';
import UiverseButton from '@/shared/components/UiverseButton';
import { useEnrollmentStore } from '../store/useEnrollmentStore';

export default function EnrollForm() {
    const [formData, setFormData] = useState<EnrollmentData>({
        name: '',
        email: '',
        visit_date: '',
        source: 'landing_hero_form'
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const { setEnrolled } = useEnrollmentStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await enrollmentService.submitEnrollment(formData);

            if (response.success) {
                setStatus('success');
                setEnrolled(true);
                setFormData({
                    name: '',
                    email: '',
                    visit_date: '',
                    source: 'landing_hero_form'
                });
            } else {
                throw new Error(response.error || 'Error al enviar el formulario');
            }
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message || 'Ocurrió un error inesperado. Por favor intenta de nuevo.');
        }
    };

    // Get today's date for min attribute
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="w-full max-w-md mx-auto bg-black/60 backdrop-blur-[15px] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/10 rounded-full blur-3xl -z-10 transition-all duration-700 group-hover:bg-[var(--accent)]/20"></div>

            {/* Header Content Removed - Moved to Parent Section */}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-medium text-white/70 ml-1">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] focus:shadow-[0_0_15px_rgba(255,183,0,0.3)] transition-all"
                        placeholder="Tu Nombre"
                    />
                </div>

                {/* Email Input */}
                <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-medium text-white/70 ml-1">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] focus:shadow-[0_0_15px_rgba(255,183,0,0.3)] transition-all"
                        placeholder="Tu mejor email"
                    />
                </div>

                {/* Visit Date Input */}
                <div className="space-y-1">
                    <label htmlFor="visit_date" className="text-xs font-medium text-white/70 ml-1">Día de tu Visita</label>
                    <div className="relative">
                        <input
                            type="date"
                            id="visit_date"
                            name="visit_date"
                            required
                            min={today}
                            value={formData.visit_date}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] focus:shadow-[0_0_15px_rgba(255,183,0,0.3)] transition-all [color-scheme:dark]"
                        />
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                    <UiverseButton
                        text={status === 'loading' ? "Enviando..." : status === 'success' ? "¡Registro Confirmado!" : "Confirmar Visita Gratuita"}
                        type="submit"
                        isSuccess={status === 'success'}
                        className="w-full"
                    />
                </div>
            </form>

            {/* Status Messages */}
            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3"
                    >
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <div className="text-sm text-green-200">
                            <p className="font-semibold text-green-400">¡Te esperamos!</p>
                            <p>Hemos reservado tu lugar. Revisa tu correo para más detalles.</p>
                        </div>
                    </motion.div>
                )}

                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div className="text-sm text-red-200">
                            <p className="font-semibold text-red-400">Error</p>
                            <p>{errorMessage}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
