'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaBolt, FaBrain, FaUsers, FaInstagram, FaFacebook, FaTrophy } from 'react-icons/fa';

// --- DATA ---
const differentiators = [
    {
        title: "SEGURIDAD TOTAL",
        description: "El conocimiento es tu mejor escudo.",
        icon: FaShieldAlt,
        details: ["Defensa efectiva", "Conciencia situacional"]
    },
    {
        title: "ENERGÍA RENOVADA",
        description: "Recupera tu vitalidad diaria.",
        icon: FaBolt,
        details: ["Adiós estrés", "Cuerpo ágil"]
    },
    {
        title: "MENTALIDAD DE ACERO",
        description: "Disciplina dentro y fuera del tatami.",
        icon: FaBrain,
        details: ["Resiliencia", "Foco total"]
    },
    {
        title: "COMUNIDAD REAL",
        description: "Una hermandad que te impulsa.",
        icon: FaUsers,
        details: ["Sin egos", "Apoyo constante"]
    }
];

const coaches = [
    {
        id: 1,
        name: "CARLOS MENDEZ",
        role: "HEAD COACH",
        image: "/images/trainer_carlos.png",
        record: "42-0",
        social: { instagram: "#", facebook: "#" }
    },
    {
        id: 2,
        name: "ANA RODRIGUEZ",
        role: "BJJ BLACK BELT",
        image: "/images/trainer_ana.png",
        record: "200+ SUBS",
        social: { instagram: "#", facebook: "#" }
    },
    {
        id: 3,
        name: "MIGUEL TORRES",
        role: "BOXING ELITE",
        image: "/images/trainer_miguel.png",
        record: "18 CHAMPS",
        social: { instagram: "#", facebook: "#" }
    }
];

export default function WhyAndTeam() {
    const [activeValue, setActiveValue] = useState<number | null>(0);

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-black z-0" />

            <div className="container mx-auto px-6 relative z-10">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center lg:text-left"
                >
                    <span className="text-[var(--accent)] font-bold tracking-[0.2em] text-sm uppercase mb-4 block">
                        Filosofía & Liderazgo
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        LA EXPERIENCIA <br className="hidden lg:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-yellow-600">BLACKBIRD</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* LEFT COLUMN: VALUES (4 cols in 12-grid system => 33% width? No, let's do 5/7 split) */}
                    <div className="lg:col-span-5 space-y-4">
                        <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-[var(--accent)] pl-4">
                            NUESTROS PILARES
                        </h3>

                        <div className="space-y-4">
                            {differentiators.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    onMouseEnter={() => setActiveValue(index)}
                                    className={`p-6 rounded-sm border transition-all duration-300 cursor-pointer group
                    ${activeValue === index
                                            ? 'bg-zinc-900 border-[var(--accent)]'
                                            : 'bg-zinc-900/30 border-white/5 hover:border-[var(--accent)]/50'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-full ${activeValue === index ? 'bg-[var(--accent)] text-black' : 'bg-black text-[var(--accent)]'}`}>
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className={`font-bold text-lg mb-1 uppercase ${activeValue === index ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-gray-400 leading-relaxed">
                                                {item.description}
                                            </p>

                                            {/* Expanded Details */}
                                            <div className={`overflow-hidden transition-all duration-300 ${activeValue === index ? 'max-h-20 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <div className="flex gap-3">
                                                    {item.details.map((detail, i) => (
                                                        <span key={i} className="text-xs font-medium text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded">
                                                            {detail}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: TRAINERS (7 cols in 12-grid system) */}
                    <div className="lg:col-span-7">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-white border-l-4 border-[var(--accent)] pl-4">
                                EL ESCUADRÓN
                            </h3>
                            <span className="text-xs text-gray-500 uppercase tracking-widest hidden md:block">
                                Expertos de clase mundial
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Featured/Large Trainer Card (First one) */}
                            <motion.div
                                className="md:col-span-2 relative group rounded-sm overflow-hidden h-[300px] md:h-[350px] bg-zinc-900"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                            >
                                <img
                                    src={coaches[0].image}
                                    alt={coaches[0].name}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 md:object-[center_top] object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <span className="inline-block px-2 py-1 bg-[var(--accent)] text-black text-xs font-black uppercase mb-2">
                                                {coaches[0].record}
                                            </span>
                                            <h4 className="text-3xl font-black text-white italic uppercase">{coaches[0].name}</h4>
                                            <p className="text-[var(--accent)] text-sm font-bold tracking-widest">{coaches[0].role}</p>
                                        </div>
                                        <div className="flex gap-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <FaInstagram className="hover:text-[var(--accent)] cursor-pointer" />
                                            <FaFacebook className="hover:text-[var(--accent)] cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Secondary Trainers */}
                            {coaches.slice(1).map((coach, index) => (
                                <motion.div
                                    key={coach.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                    viewport={{ once: true }}
                                    className="relative group rounded-sm overflow-hidden h-[250px] bg-zinc-900"
                                >
                                    <img
                                        src={coach.image}
                                        alt={coach.name}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 object-top"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                                    <div className="absolute bottom-0 left-0 p-6 w-full">
                                        <span className="text-[var(--accent)] text-xs font-bold block mb-1">{coach.record}</span>
                                        <h4 className="text-xl font-black text-white italic uppercase">{coach.name}</h4>
                                        <p className="text-gray-400 text-xs uppercase tracking-wider">{coach.role}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
