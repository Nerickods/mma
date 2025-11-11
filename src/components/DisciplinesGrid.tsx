'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFistRaised, FaShieldAlt, FaFire, FaBolt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Discipline {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  benefits: string[];
  image: string;
  icon: React.ComponentType<{className?: string}>;
  gradient: string;
  accentColor: string;
}

const disciplines: Discipline[] = [
  {
    id: 1,
    name: "BOXEO",
    subtitle: "Arma letal de combate a corta distancia",
    description: "No es solo pegar. Es arte, timing y estrategia. Convierte tus manos en armas precisas que encuentran siempre el blanco.",
    benefits: [
      "Aprende a noquear con precisión quirúrgica",
      "Desarrolla reflejos que anticipan movimientos enemigos",
      "Construye resistencia para 12 rounds de guerra",
      "Forja una mente de acero bajo presión extrema"
    ],
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=600&fit=crop&q=80",
    icon: FaFistRaised,
    gradient: "from-red-900 to-black",
    accentColor: "text-red-400"
  },
  {
    id: 2,
    name: "MUAY THAI",
    subtitle: "El arte de guerra de 8 armas mortales",
    description: "Convierte tu cuerpo en un arma completa. Codos, rodillas, puños y tibias se vuelven extensiones letales de tu voluntad de vencer.",
    benefits: [
      "Domina las 8 armas naturales del cuerpo humano",
      "Desarrolla piernas que pueden romper huesos",
      "Crea defensa impenetrable desde todas las distancias",
      "Construye el corazón de un guerrero tailandés legendario"
    ],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&q=80",
    icon: FaFire,
    gradient: "from-orange-900 to-black",
    accentColor: "text-orange-400"
  },
  {
    id: 3,
    name: "JIU JITSU",
    subtitle: "Ajedrez humano con consecuencias reales",
    description: "Donde la fuerza bruta muere y la estrategia reina. Aprende a destruir rivales más grandes usando su propia energía en tu contra.",
    benefits: [
      "Convierte la fuerza enemiga en su propia derrota",
      "Desarrolla una mente que calcula 10 movimientos adelante",
      "Aprende a sobrevivir y dominar cuando estás en desventaja",
      "Construye confianza absoluta en combate cuerpo a cuerpo"
    ],
    image: "https://images.unsplash.com/photo-1594736797933-d0dcc4ba7423?w=800&h=600&fit=crop&q=80",
    icon: FaShieldAlt,
    gradient: "from-blue-900 to-black",
    accentColor: "text-blue-400"
  },
  {
    id: 4,
    name: "GRAPPLING",
    subtitle: "Control absoluto del cuerpo enemigo",
    description: "El combate real termina en el suelo. Aquí aprendes a dominar, controlar y terminar cualquier confrontación con eficiencia brutal.",
    benefits: [
      "Domina el arte de inmovilizar y someter al enemigo",
      "Desarrolla fuerza de agarre que no puede escapar",
      "Aprende a terminar peleas sin recibir un golpe",
      "Construye la confianza de quien nunca pierde el control"
    ],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    icon: FaShieldAlt,
    gradient: "from-green-900 to-black",
    accentColor: "text-green-400"
  },
  {
    id: 5,
    name: "KICKBOXING",
    subtitle: "Combate total: pies que matan, manos que destruyen",
    description: "La evolución perfecta del combate. Combina la ciencia del boxeo con el poder devastador de las patadas para crear el luchador completo.",
    benefits: [
      "Conviértete en un arma de doble destrucción efectiva",
      "Desarrolla velocidad de relámpago con poder de terremoto",
      "Aprende a controlar todas las distancias de combate",
      "Construye un cuerpo capaz de soportar castigo brutal"
    ],
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=600&fit=crop&q=80",
    icon: FaBolt,
    gradient: "from-purple-900 to-black",
    accentColor: "text-purple-400"
  }
];

// Componente reutilizable para cards de disciplinas
interface DisciplineCardProps {
  discipline: Discipline;
  index: number;
  expandedCards: Set<number>;
  toggleCard: (id: number) => void;
}

function DisciplineCard({ discipline, index, expandedCards, toggleCard }: DisciplineCardProps) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-600/30 hover:border-[var(--accent)]/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[var(--accent)]/20">
        
        {/* Imagen de fondo con overlay */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img
            src={discipline.image}
            alt={discipline.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${discipline.gradient} opacity-80 group-hover:opacity-60 transition-opacity duration-500`}></div>
          
          {/* Número gigante estilo ACE */}
          <div className="absolute top-4 left-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
              viewport={{ once: true }}
              className="w-16 h-16 bg-[var(--accent)] rounded-xl flex items-center justify-center shadow-2xl border-2 border-white/20"
            >
              <span className="text-black text-2xl font-black">
                {discipline.id}
              </span>
            </motion.div>
          </div>

          {/* Icono decorativo */}
          <div className="absolute top-4 right-4">
            <motion.div
              whileHover={{ scale: 1.3, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-xl flex items-center justify-center border border-[var(--accent)]/50"
            >
              <discipline.icon className={`text-lg ${discipline.accentColor}`} />
            </motion.div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-4">
          <h3 className="text-xl md:text-2xl font-black text-white mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">
            {discipline.name}
          </h3>
          
          <p className={`font-semibold text-base mb-3 ${discipline.accentColor}`}>
            {discipline.subtitle}
          </p>
          
          <p className="text-white/90 text-sm md:text-base leading-relaxed mb-4">
            {discipline.description}
          </p>

          {/* Botón Ver más/menos */}
          <motion.button
            onClick={() => toggleCard(discipline.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-[var(--accent)] font-semibold mb-4 hover:text-yellow-400 transition-colors duration-300 text-sm"
          >
            <span>{expandedCards.has(discipline.id) ? 'Ver menos' : 'Ver beneficios'}</span>
            {expandedCards.has(discipline.id) ? 
              <FaChevronUp className="text-xs" /> : 
              <FaChevronDown className="text-xs" />
            }
          </motion.button>

          {/* Lista de beneficios expandible */}
          <AnimatePresence>
            {expandedCards.has(discipline.id) && (
              <motion.div
                initial={false}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 pt-2">
                  {discipline.benefits.map((benefit, benefitIndex) => (
                    <motion.div
                      key={benefitIndex}
                      initial={false}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: benefitIndex * 0.1 }}
                      className="flex items-start gap-3 group/benefit"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-[var(--accent)] rounded-full group-hover/benefit:scale-150 transition-transform duration-300"></div>
                      </div>
                      <p className="text-white/80 group-hover:text-white transition-colors duration-300 text-sm">
                        {benefit}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Línea decorativa */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 1 }}
            viewport={{ once: true }}
            className="w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mt-4 origin-center"
          ></motion.div>
        </div>

        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[var(--accent)]/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DisciplinesGrid() {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = (id: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  return (
    <section id="disciplinas" className="py-16 bg-gradient-to-br from-black via-gray-900 to-black relative">
      {/* Fondo simplificado */}
      <div className="absolute inset-0 bg-[var(--accent)]/5 opacity-30"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-full px-6 py-3 mb-8">
            <FaFistRaised className="text-[var(--accent)] text-xl" />
            <span className="text-[var(--accent)] font-bold tracking-wide">NUESTRAS ESPECIALIDADES</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Armas de <span className="text-[var(--accent)]">COMBATE MORTAL</span>
          </h2>
          <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
            Estas no son "clases de ejercicio". Son sistemas de combate probados en batallas reales.
            <span className="text-[var(--accent)] font-black"> Elige tu arma o domina todas.</span>
          </p>
        </motion.div>

        {/* Scroll horizontal para TODOS los dispositivos */}
        <div className="relative">
          
          {/* Carrusel horizontal universal */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 px-4 w-max pb-4">
              {disciplines.map((discipline, index) => (
                <div key={discipline.id} className="w-80 lg:w-96 flex-shrink-0">
                  <DisciplineCard 
                    discipline={discipline} 
                    index={index} 
                    expandedCards={expandedCards}
                    toggleCard={toggleCard}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicador de scroll universal */}
          <div className="text-center mt-6">
            <p className="text-white/60 text-sm flex items-center justify-center gap-2">
              <span className="hidden md:block">← Desliza para explorar todas las disciplinas →</span>
              <span className="md:hidden">👈 Desliza para ver todas las disciplinas</span>
            </p>
          </div>
        </div>

        {/* CTA final */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Quieres ser <span className="text-[var(--accent)]">LETHAL</span> o seguir siendo vulnerable?
            </h3>
            <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Tu clase gratuita incluye evaluación de combate y recomendación estratégica
              según tu físico y objetivos de dominación.
            </p>
            <motion.button
              onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-button text-xl px-12 py-5"
            >
              ELEGIR MI ARMA MORTAL
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
