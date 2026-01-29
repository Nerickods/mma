'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
    FaSearch, FaFilter, FaCommentDots, FaUser, FaEnvelope,
    FaCalendarCheck, FaGlobe, FaRobot
} from 'react-icons/fa';
import Link from 'next/link';
import { SavedEnrollment } from '../../services/enrollmentServerService';

interface EnrollmentsTabProps {
    initialData: SavedEnrollment[];
}

export default function EnrollmentsTab({ initialData }: EnrollmentsTabProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSource, setFilterSource] = useState<'all' | 'landing_form' | 'chat_agent'>('all');

    const filteredData = initialData.filter(item => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSource = filterSource === 'all' || item.source === filterSource;

        return matchesSearch && matchesSource;
    });

    const getSourceIcon = (source: string) => {
        if (source === 'chat_agent') return <FaRobot className="text-[var(--accent)]" />;
        return <FaGlobe className="text-blue-400" />;
    };

    const getConversationId = (metadata: any) => {
        if (!metadata) return null;
        // Handle both string JSON or object (Supabase returns object usually)
        const meta = typeof metadata === 'string' ? JSON.parse(metadata) : metadata;
        return meta?.conversation_id;
    };

    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                        Solicitudes de <span className="text-[var(--accent)] text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-600">Ingreso</span>
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Gestión de leads provenientes de Landing y Chatbot.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
                    <span className="text-xs text-gray-500 uppercase tracking-widest block">Total </span>
                    <span className="text-xl font-bold text-white">{initialData.length}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-4 bg-black/20 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
                {/* Search */}
                <div className="relative flex-grow max-w-md">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o correo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilterSource('all')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filterSource === 'all'
                                ? 'bg-white text-black'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFilterSource('landing_form')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${filterSource === 'landing_form'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        <FaGlobe /> Web
                    </button>
                    <button
                        onClick={() => setFilterSource('chat_agent')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${filterSource === 'chat_agent'
                                ? 'bg-[var(--accent)] text-black'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        <FaRobot /> IA
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider border-b border-white/10">
                                <th className="p-4 font-bold">Fecha</th>
                                <th className="p-4 font-bold">Usuario</th>
                                <th className="p-4 font-bold">Horario Pref.</th>
                                <th className="p-4 font-bold text-center">Origen</th>
                                <th className="p-4 font-bold text-center">Estado</th>
                                <th className="p-4 font-bold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredData.map((item, index) => {
                                const conversationId = getConversationId(item.metadata);
                                return (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="text-sm text-gray-300 hover:bg-white/5 transition-colors"
                                    >
                                        <td className="p-4 text-xs">
                                            {format(new Date(item.created_at), "d MMM yyyy, HH:mm", { locale: es })}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-white flex items-center gap-2">
                                                    <FaUser className="text-gray-500 text-[10px]" /> {item.name}
                                                </span>
                                                <span className="text-xs text-gray-500 flex items-center gap-2">
                                                    <FaEnvelope className="text-[10px]" /> {item.email}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {item.preferred_schedule ? (
                                                <span className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-md w-fit">
                                                    <FaCalendarCheck className="text-[var(--accent)]" />
                                                    {item.preferred_schedule}
                                                </span>
                                            ) : (
                                                <span className="text-gray-600 italic">No especificado</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-2" title={item.source}>
                                                {getSourceIcon(item.source)}
                                                <span className="capitalize text-xs">{item.source === 'chat_agent' ? 'Assistant' : 'Web Rate'}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${item.status === 'new' ? 'bg-green-500/10 border-green-500 text-green-500' :
                                                    item.status === 'contacted' ? 'bg-blue-500/10 border-blue-500 text-blue-500' :
                                                        'bg-gray-500/10 border-gray-500 text-gray-500'
                                                }`}>
                                                {item.status || 'Nuevo'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            {conversationId && (
                                                <Link
                                                    href={`/admin/conversations/${conversationId}`}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-2 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 text-[var(--accent)] px-3 py-1.5 rounded-lg transition-colors border border-[var(--accent)]/20"
                                                    title="Ver conversación completa"
                                                >
                                                    <FaCommentDots /> <span className="text-xs font-bold">Ver Chat</span>
                                                </Link>
                                            )}
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredData.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p>No se encontraron registros.</p>
                </div>
            )}
        </div>
    );
}
