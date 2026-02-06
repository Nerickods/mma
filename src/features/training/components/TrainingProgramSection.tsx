'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import {
    FaFistRaised, FaFire, FaShieldAlt, FaBolt,
    FaClock, FaCalendarAlt, FaUser, FaStar,
    FaInfoCircle, FaDumbbell
} from 'react-icons/fa';

import { disciplines, SCHEDULE_DATA } from '@/shared/constants/training-data';

import { ClassSchedule } from '../types';

interface TrainingProgramSectionProps {
    schedule?: ClassSchedule[];
}

export default function TrainingProgramSection({ schedule }: TrainingProgramSectionProps) {
    const [activeTab, setActiveTab] = useState<string>('mma'); // Default to MMA
    const [isScheduleExpanded, setIsScheduleExpanded] = useState(false);

    const handleReserve = (className: string) => {
        document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Use DB schedule if available, otherwise fallback to static data
    const activeSchedule = schedule && schedule.length > 0 ? schedule : SCHEDULE_DATA;
    const filteredSchedule = activeSchedule.filter(item => item.type === activeTab);
    const activeDisciplineInfo = disciplines.find(d => d.id === activeTab);

    return (
        <section id="programa" className="relative min-h-[100dvh] flex flex-col bg-black overflow-hidden py-16 md:py-24">

            {/* --- 1. IMMERSIVE BACKGROUND LAYER --- */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    {activeDisciplineInfo && (
                        <motion.div
                            key={activeDisciplineInfo.id}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }} // Smooth crossfade
                            transition={{ duration: 0.8, ease: "easeInOut" }} // Sincronizado para fluidez premium
                            className="absolute inset-0"
                        >
                            {/* Main Image */}
                            <img
                                src={activeDisciplineInfo.image}
                                alt={activeDisciplineInfo.name}
                                className="w-full h-full object-cover brightness-[1.1] contrast-[1.1]"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/discipline_grappling.png';
                                }}
                            />

                            {/* --- OVERLAYS FOR READABILITY --- */}
                            {/* Base Darkening with Adaptive Tint - Higher clarity */}
                            <div className="absolute inset-0 bg-black/40 backdrop-grayscale-[0.1]" />

                            {/* Bottom Fade (for smooth footer transition) */}
                            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black via-black/80 to-transparent" />

                            {/* Left Side Fade (Critical for readability on lighter backgrounds) */}
                            <div className="absolute inset-y-0 left-0 w-full md:w-[75%] bg-gradient-to-r from-black via-black/95 via-[30%] to-transparent" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


            {/* --- 2. MAIN CONTENT (Z-10) --- */}
            <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="text-[var(--accent)] font-bold tracking-[0.3em] text-xs uppercase mb-4 block animate-fade-in drop-shadow-md">
                            SISTEMA INTEGRAL
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl">
                            INGENIERÍA <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-white">
                                DEL COMBATE
                            </span>
                        </h2>
                    </div>

                    {/* OPENING HOURS BADGE (Floating Glass) */}
                    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 hover:bg-black/50 transition-colors">
                        <div className="flex items-center gap-2 text-[var(--accent)] font-bold text-xs uppercase tracking-widest whitespace-nowrap mb-2">
                            <FaClock /> Horarios de Apertura
                        </div>
                        <div className="flex flex-col items-start gap-1 text-xs text-gray-300">
                            <span><strong className="text-white">LUN-VIE:</strong> 8:30-10:30 AM / 4:00-9:00 PM</span>
                            <span><strong className="text-white">SÁB:</strong> 8:00-10:00 AM</span>
                        </div>
                    </div>
                </div>


                {/* TABS SELECTOR (Floating Capsule) */}
                <div className="mb-16">
                    <div className="inline-flex overflow-x-auto max-w-full p-2 gap-2 backdrop-blur-lg bg-white/5 border border-white/10 rounded-full scrollbar-hide">
                        {disciplines.map((d) => (
                            <button
                                key={d.id}
                                onClick={() => setActiveTab(d.id)}
                                className={`
                                    flex-shrink-0 px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2
                                    ${activeTab === d.id
                                        ? 'bg-[var(--accent)] text-black shadow-[0_0_20px_rgba(255,215,0,0.4)] scale-105'
                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                    }
                                `}
                            >
                                <d.icon />
                                {d.name}
                            </button>
                        ))}
                    </div>
                </div>


                {/* CONTENT COLUMNS */}
                <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* LEFT COLUMN: IMMERSIVE INFO */}
                    <AnimatePresence mode='popLayout'>
                        {activeDisciplineInfo && (
                            <motion.div
                                key={activeDisciplineInfo.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="lg:col-span-5"
                            >
                                {/* Giant Title for Texture */}
                                <h3 className="text-5xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent absolute -top-20 -left-10 select-none pointer-events-none opacity-50">
                                    {activeDisciplineInfo.id === 'mma' ? 'MMA' : activeDisciplineInfo.name.split(' ')[0]}
                                </h3>

                                <div className="relative">
                                    <div className="flex items-center gap-4 mb-6">
                                        <activeDisciplineInfo.icon className={`text-5xl ${activeDisciplineInfo.accentColor} drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]`} />
                                        <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase leading-none drop-shadow-lg">
                                            {activeDisciplineInfo.name}
                                        </h3>
                                    </div>

                                    <p className="text-[var(--accent)] text-lg font-bold tracking-widest mb-6 drop-shadow-md">
                                        {activeDisciplineInfo.subtitle}
                                    </p>

                                    <p className="text-gray-200 text-lg leading-relaxed mb-8 font-light drop-shadow-md max-w-xl">
                                        {activeDisciplineInfo.description}
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                        {activeDisciplineInfo.benefits.map((benefit, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs font-bold text-white bg-black/40 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                                                <FaStar className="text-[var(--accent)] text-[10px]" />
                                                {benefit}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    {/* RIGHT COLUMN: GLASS SCHEDULE LIST */}
                    <div className="lg:col-span-7">
                        <AnimatePresence mode='popLayout'>
                            <motion.div
                                key={activeTab + "-list"}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-3"
                            >
                                {filteredSchedule.length > 0 ? (
                                    filteredSchedule.sort((a, b) => {
                                        const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
                                        return (days.indexOf(a.day) - days.indexOf(b.day)) || a.time.localeCompare(b.time);
                                    }).map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => handleReserve(item.id)}
                                            className={cn(
                                                "group relative flex items-center justify-between p-4 rounded-xl cursor-pointer border border-white/5 bg-black/40 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300",
                                                index > 0 && !isScheduleExpanded ? "hidden md:flex" : "flex"
                                            )}
                                        >
                                            {/* Glow Effect on Hover */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 to-transparent opacity-0 group-hover:from-[var(--accent)]/10 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

                                            {/* Time Info */}
                                            <div className="w-[20%] relative z-10">
                                                <div className="flex items-center gap-1 text-[var(--accent)] text-[10px] font-bold uppercase tracking-wider mb-0.5">
                                                    <FaCalendarAlt /> {item.day}
                                                </div>
                                                <div className="text-xl font-black text-white group-hover:scale-105 transition-transform origin-left">
                                                    {item.time}
                                                </div>
                                            </div>

                                            {/* Class Details */}
                                            <div className="w-[45%] px-4 relative z-10 border-l border-white/10">
                                                <h4 className="text-sm font-bold text-white uppercase group-hover:text-[var(--accent)] transition-colors">
                                                    {item.discipline}
                                                </h4>
                                                <p className="text-gray-400 text-[10px] uppercase tracking-wide">{item.level}</p>
                                            </div>

                                            {/* Instructor & CTA */}
                                            <div className="w-[35%] flex items-center justify-end gap-3 relative z-10">
                                                <div className="hidden sm:flex flex-col items-end">
                                                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">Instructor</span>
                                                    <span className="text-xs text-gray-300 font-bold">{item.instructor}</span>
                                                </div>
                                                <button className="bg-white/10 hover:bg-[var(--accent)] hover:text-black text-white p-2 rounded-lg transition-all">
                                                    <FaUser size={14} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 border-dashed">
                                        <FaInfoCircle className="mx-auto text-4xl mb-4 text-gray-600" />
                                        <p className="text-gray-400">No hay clases programadas actualmente.</p>
                                    </div>
                                )}

                            </motion.div>
                        </AnimatePresence>

                        {/* Mobile View More Button */}
                        {filteredSchedule.length > 1 && !isScheduleExpanded && (
                            <div className="mt-8 text-center md:hidden">
                                <button
                                    onClick={() => setIsScheduleExpanded(true)}
                                    className="px-8 py-3 bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-bold uppercase tracking-widest hover:bg-[var(--accent)] hover:text-black transition-all duration-300 rounded-full w-full"
                                >
                                    Ver todos los horarios (+{filteredSchedule.length - 1})
                                </button>
                            </div>
                        )}
                        {isScheduleExpanded && (
                            <div className="mt-8 text-center md:hidden">
                                <button
                                    onClick={() => setIsScheduleExpanded(false)}
                                    className="text-zinc-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                                >
                                    Mostrar menos
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section >
    );
}
