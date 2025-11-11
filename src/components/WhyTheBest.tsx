'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaTrophy, FaFistRaised, FaChartLine, FaPlus, FaMinus } from 'react-icons/fa';

interface Differentiator {
  title: string;
  description: string;
  icon: React.ComponentType<{className?: string}>;
  details: string[];
}

const differentiators: Differentiator[] = [
  {
    title: "ENTRENADORES QUE HAN SANGRADO EN EL RING",
    description: "No leas libros de teóricos. Aprende de guerreros que han sentido el golpe, la victoria y la derrota. Sabiduría real que solo se adquiere en combate.",
    icon: FaCertificate,
    details: [
      "15+ años de experiencia profesional en octágonos",
      "Títulos nacionales e internacionales en sus disciplinas",
      "Entrenamiento con leyendas del combate mundial",
      "Cicatrices que cuentan historias de victorias reales"
    ]
  },
  {
    title: "SISTEMA DE BATALLA CAMPEÓN",
    description: "Metodología forjada en cientos de combates reales. Lo que funciona aquí funciona en cualquier campo de batalla del mundo.",
    icon: FaTrophy,
    details: [
      "Técnicas que han ganado títulos en UFC y Bellator",
      "Sistema progresivo: Sobrevivir → Competir → Dominar",
      "Análisis estratégico de más de 1,000 peleas profesionales",
      "Condicionamiento que soporta 5 rounds de guerra total"
    ]
  },
  {
    title: "CAMPO DE ENTRENAMIENTO DE ÉLITE",
    description: "Aquí no hay distracciones. Solo guerreros con hambre de victoria. Cada día es una batalla, cada sudor es una preparación para la guerra.",
    icon: FaFistRaised,
    details: [
      "Octágono profesional certificado por comisiones internacionales",
      "Equipamiento UFC Performance Institute nivel",
      "Comunidad que te reta cada día a ser mejor",
      "Cero excusas. Cero mediocridad. 100% resultados"
    ]
  },
  {
    title: "TRANSFORMACIÓN GARANTIZADA O TE DEVOLVEMOS TU SUDOR",
    description: "Si en 30 días no sientes que eres un guerrero más fuerte, más rápido y más letal, no pagues. Es así de simple.",
    icon: FaChartLine,
    details: [
      "Ganancia promedio: 473% en confianza de combate en 90 días",
      "Medición semanal de progreso técnico y físico",
      "Objetivos de combate personalizados con plazos específicos",
      "Garantía de transformación o tu dinero sin preguntas"
    ]
  }
];

export default function WhyTheBest() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-black via-gray-900 to-black relative">
      <div className="container mx-auto px-6">
        
        {/* Header centralizado */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-full px-6 py-3 mb-8">
            <FaTrophy className="text-[var(--accent)] text-xl" />
            <span className="text-[var(--accent)] font-bold tracking-wide">LA DIFERENCIA BLACKBIRD</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Por qué los <span className="text-[var(--accent)]">CAMPEONES</span> eligen Blackbird
          </h2>
          <p className="text-white/70 text-xl max-w-3xl mx-auto">
            Mientras otros hacen ejercicios, nosotros creamos guerreros. La diferencia no es pequeña, es la diferencia entre ser víctima o victorioso.
          </p>
        </motion.div>

        {/* Grid de diferenciadores sin imagen problemática */}
        <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
          {differentiators.map((diff, index) => (
            <motion.div
              key={index}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 hover:border-[var(--accent)]/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[var(--accent)]/20">
                
                {/* Icono principal */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-[var(--accent)] to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <diff.icon className="text-black text-2xl" />
                  </motion.div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center group-hover:text-[var(--accent)] transition-colors duration-300">
                  {diff.title}
                </h3>
                
                <p className="text-white/80 text-lg leading-relaxed text-center group-hover:text-white transition-colors duration-300 mb-4">
                  {diff.description}
                </p>

                {/* Botón Ver más/menos */}
                <div className="text-center mb-4">
                  <motion.button
                    onClick={() => toggleItem(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:text-yellow-400 transition-colors duration-300 border border-[var(--accent)]/30 rounded-full px-4 py-2 hover:border-[var(--accent)]/60"
                  >
                    <span>{expandedItems.has(index) ? 'Ver menos' : 'Ver detalles'}</span>
                    {expandedItems.has(index) ? 
                      <FaMinus className="text-sm" /> : 
                      <FaPlus className="text-sm" />
                    }
                  </motion.button>
                </div>

                {/* Detalles expandibles */}
                <AnimatePresence>
                  {expandedItems.has(index) && (
                    <motion.div
                      initial={false}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-xl p-4 mt-4">
                        <div className="space-y-2">
                          {diff.details.map((detail, detailIndex) => (
                            <motion.div
                              key={detailIndex}
                              initial={false}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: detailIndex * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className="flex-shrink-0 mt-2">
                                <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                              </div>
                              <p className="text-white/90 text-sm leading-relaxed">
                                {detail}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Línea decorativa */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  className="w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mt-6 origin-center"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA final simplificado */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-3xl p-10 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Prefieres ser <span className="text-[var(--accent)]">presa o depredador?</span>
            </h3>
            <p className="text-white/80 text-xl mb-8">
              La decisión es tuya. La preparación es nuestra. Tu primera clase de supervivencia es GRATIS.
            </p>
            <motion.button
              onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-button text-xl px-12 py-5"
            >
              UNIRME A LA MANADA
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
