'use client';

import { motion } from 'framer-motion';
import { FaTrophy, FaUsers, FaClock, FaMedal } from 'react-icons/fa';

interface StatItem {
  number: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
}

const stats: StatItem[] = [
  {
    number: "2K+",
    label: "Transformaciones exitosas",
    icon: FaTrophy,
    color: "text-[var(--accent)]"
  },
  {
    number: "500+",
    label: "Miembros activos",
    icon: FaUsers,
    color: "text-[var(--accent)]"
  },
  {
    number: "15+",
    label: "Años de experiencia",
    icon: FaClock,
    color: "text-[var(--accent)]"
  },
  {
    number: "3",
    label: "Especialistas certificados",
    icon: FaMedal,
    color: "text-[var(--accent)]"
  }
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 via-black to-gray-900 relative overflow-hidden">
      {/* Efectos de fondo premium */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--accent)]/5 via-transparent to-transparent"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--accent)]/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-[var(--accent)]/4 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header con inspiración ACE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-full px-6 py-3 mb-8">
            <FaTrophy className="text-[var(--accent)] text-xl" />
            <span className="text-[var(--accent)] font-semibold tracking-wide">NUESTROS NÚMEROS HABLAN</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Resultados que <span className="text-[var(--accent)]">transforman vidas</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
            Más de una década formando guerreros. Cada número representa historias reales de superación.
          </p>
        </motion.div>

        {/* Grid de estadísticas estilo ACE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card con efectos premium */}
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/30 group-hover:border-[var(--accent)]/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--accent)]/20">
                
                {/* Icono superior */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-[var(--accent)] to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-[var(--accent)]/40"
                  >
                    <stat.icon className="text-black text-2xl" />
                  </motion.div>
                </div>

                {/* Número gigante estilo ACE */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-center mb-4"
                >
                  <div className={`text-6xl md:text-7xl lg:text-8xl font-black ${stat.color} leading-none tracking-tight`}
                       style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.3)' }}>
                    {stat.number}
                  </div>
                </motion.div>

                {/* Label descriptivo */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                  className="text-white/90 text-lg md:text-xl font-semibold text-center leading-snug group-hover:text-[var(--accent)] transition-colors duration-300"
                >
                  {stat.label}
                </motion.p>

                {/* Línea decorativa animada */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.7 }}
                  viewport={{ once: true }}
                  className="w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mt-6 origin-center"
                ></motion.div>

                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[var(--accent)]/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA integrado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-white/90 text-lg mb-4">
              <span className="text-[var(--accent)] font-bold">¿Quieres ser parte de estas estadísticas?</span><br/>
              Tu transformación empieza con una sola decisión.
            </p>
            <motion.button
              onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-button text-lg px-8 py-4"
            >
              Unirme a Blackbird House
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
