'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCalendarAlt, FaUser, FaInfoCircle, FaDumbbell, FaSearch, FaPlus, FaEdit, FaTrash, FaTimes, FaSave
} from 'react-icons/fa';
import { disciplines } from '@/shared/constants/training-data';
import { ClassSchedule } from '../../types';
import { createClassAction, updateClassAction, deleteClassAction } from '../../actions/scheduleActions';

interface DisciplinesTabProps {
    initialSchedule: ClassSchedule[];
}

export default function DisciplinesTab({ initialSchedule }: DisciplinesTabProps) {
    const [schedule, setSchedule] = useState<ClassSchedule[]>(initialSchedule);
    const [activeTab, setActiveTab] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState<Partial<ClassSchedule> | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Sync state with props if revalidated (optional, but good for simple cases)
    React.useEffect(() => {
        setSchedule(initialSchedule);
    }, [initialSchedule]);

    // Filter logic
    const filteredSchedule = schedule.filter(item => {
        const matchesTab = activeTab === 'all' || item.type === activeTab;
        const matchesSearch = item.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    // CRUD Handlers
    const handleEdit = (item: ClassSchedule) => {
        setEditingClass(item);
        setIsModalOpen(true);
    };

    const handleNew = () => {
        setEditingClass({
            day: 'Lunes',
            time: '08:00',
            duration: '60 min',
            spots: 20,
            level: 'General',
            instructor: '',
            discipline: '',
            type: 'boxing' // Default
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar esta clase?')) return;

        await deleteClassAction(id);
        // Optimistic update
        setSchedule(prev => prev.filter(item => item.id !== id));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingClass) return;

        setIsSaving(true);
        try {
            if (editingClass.id) {
                // Update
                await updateClassAction(editingClass.id, editingClass);
            } else {
                // Create
                await createClassAction(editingClass as Omit<ClassSchedule, 'id'>);
            }
            setIsModalOpen(false);
            setEditingClass(null);
        } catch (error) {
            console.error(error);
            alert('Error al guardar');
        } finally {
            setIsSaving(false);
        }
    };

    // Group by Day for better admin view (Client Side)
    const groupedSchedule = filteredSchedule.reduce((acc, item) => {
        if (!acc[item.day]) acc[item.day] = [];
        acc[item.day].push(item);
        return acc;
    }, {} as Record<string, ClassSchedule[]>);

    const daysOrder = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const sortedDays = Object.keys(groupedSchedule).sort((a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b));

    return (
        <div className="p-6 space-y-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                        Programación <span className="text-[var(--accent)] text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-600">Maestra</span>
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Gestión completa del calendario. Los cambios se reflejan en tiempo real.
                    </p>
                </div>

                <button
                    onClick={handleNew}
                    className="flex items-center gap-2 bg-[var(--accent)] text-black px-6 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-orange-500/20"
                >
                    <FaPlus /> Nueva Clase
                </button>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row gap-4 bg-black/20 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
                <div className="relative flex-grow max-w-md">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Buscar clase o instructor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                </div>

                <div className="flex-grow overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'all'
                                ? 'bg-white text-black'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            Todas
                        </button>
                        {disciplines.map(d => (
                            <button
                                key={d.id}
                                onClick={() => setActiveTab(d.id)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === d.id
                                    ? `bg-gradient-to-r ${d.gradient} text-white border border-white/20`
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                <d.icon className={activeTab === d.id ? "text-white" : ""} />
                                {d.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Schedule Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {sortedDays.map((day) => (
                    <motion.div
                        key={day}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm flex flex-col"
                    >
                        <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex justify-between items-center">
                            <h3 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                                <FaCalendarAlt className="text-[var(--accent)]" /> {day}
                            </h3>
                            <span className="text-xs font-bold bg-white/10 text-gray-300 px-2 py-1 rounded-md">
                                {groupedSchedule[day].length} Clases
                            </span>
                        </div>

                        <div className="p-4 space-y-3 flex-grow">
                            {groupedSchedule[day].sort((a, b) => a.time.localeCompare(b.time)).map((item) => {
                                const disciplineInfo = disciplines.find(d => d.id === item.type);
                                return (
                                    <div
                                        key={item.id}
                                        className="group relative bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-3 transition-all duration-300"
                                    >
                                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(item)} className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40">
                                                <FaEdit size={12} />
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40">
                                                <FaTrash size={12} />
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-start mb-2 pr-16">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg bg-gradient-to-br ${disciplineInfo?.gradient || 'from-gray-800 to-black'}`}>
                                                    {disciplineInfo?.icon ? <disciplineInfo.icon className="text-white" /> : <FaDumbbell />}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-white">
                                                        {item.discipline}
                                                    </h4>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.level}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-lg font-black text-white block leading-none">{item.time}</span>
                                                <span className="text-[10px] text-gray-500">{item.duration}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                                                    <FaUser size={10} className="text-gray-400" />
                                                </div>
                                                <span className="text-xs text-gray-300 font-medium">Instr. {item.instructor}</span>
                                            </div>
                                            <div className="text-[10px] text-gray-500">
                                                Cupo: {item.spots}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Edit/Create Modal */}
            <AnimatePresence>
                {isModalOpen && editingClass && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-lg relative z-10 shadow-2xl"
                        >
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                {editingClass.id ? <FaEdit className="text-[var(--accent)]" /> : <FaPlus className="text-[var(--accent)]" />}
                                {editingClass.id ? 'Editar Clase' : 'Nueva Clase'}
                            </h3>

                            <form onSubmit={handleSave} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Día</label>
                                        <select
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] outline-none"
                                            value={editingClass.day}
                                            onChange={e => setEditingClass({ ...editingClass, day: e.target.value })}
                                        >
                                            {daysOrder.map(d => <option key={d} value={d} className="bg-black">{d}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Hora</label>
                                        <input
                                            type="time"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] outline-none"
                                            value={editingClass.time}
                                            onChange={e => setEditingClass({ ...editingClass, time: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Disciplina Principal</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] outline-none"
                                        value={editingClass.type}
                                        onChange={e => {
                                            const disc = disciplines.find(d => d.id === e.target.value);
                                            setEditingClass({
                                                ...editingClass,
                                                type: e.target.value,
                                                discipline: disc ? disc.name : editingClass.discipline // Auto-fill name
                                            })
                                        }}
                                    >
                                        {disciplines.map(d => <option key={d.id} value={d.id} className="bg-black">{d.name}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Nombre Display (e.g. Sparring MMA)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] outline-none"
                                        value={editingClass.discipline}
                                        onChange={e => setEditingClass({ ...editingClass, discipline: e.target.value })}
                                        placeholder="Nombre específico de la clase"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Instructor</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] outline-none"
                                            value={editingClass.instructor}
                                            onChange={e => setEditingClass({ ...editingClass, instructor: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Nivel</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] outline-none"
                                            value={editingClass.level}
                                            onChange={e => setEditingClass({ ...editingClass, level: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-bold text-sm"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="px-6 py-2 rounded-lg bg-[var(--accent)] text-black font-bold flex items-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
                                    >
                                        {isSaving ? 'Guardando...' : <><FaSave /> Guardar</>}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
