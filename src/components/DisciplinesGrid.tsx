'use client';

import { motion } from 'framer-motion';
import { FaFistRaised, FaShieldAlt, FaFire, FaBolt } from 'react-icons/fa';

interface Discipline {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  benefits: string[];
  image: string;
  icon: React.ComponentType<any>;
  gradient: string;
  accentColor: string;
}

const disciplines: Discipline[] = [
  {
    id: 1,
    name: "ARTES MARCIALES MIXTAS",
    subtitle: "Combate completo y dominante",
    description: "La forma más completa de combate que existe. Combina las mejores técnicas de striking, grappling y lucha, preparándote para cualquier situación de enfrentamiento real.",
    benefits: [
      "Domina striking, grappling y lucha en una disciplina",
      "Desarrolla confianza y mentalidad de guerrero inquebrantable",
      "Mejora tu condición cardiovascular y fuerza funcional",
      "Aprende defensa personal efectiva para situaciones reales"
    ],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
    icon: FaFistRaised,
    gradient: "from-red-900 to-black",
    accentColor: "text-red-400"
  },
  {
    id: 2,
    name: "JIU JITSU BRASILEÑO", 
    subtitle: "Arte suave dominante",
    description: "El arte de vencer a oponentes más grandes y fuertes usando técnica, timing y leverage. La disciplina perfecta para desarrollar paciencia estratégica y dominio mental.",
    benefits: [
      "Vence oponentes más grandes usando técnica sobre fuerza",
      "Desarrolla paciencia estratégica y pensamiento analítico",
      "Mejora flexibilidad, coordinación y equilibrio",
      "Construye confianza inquebrantable en el suelo"
    ],
    image: "https://images.unsplash.com/photo-1594736797933-d0dcc4ba7423?w=800&h=600&fit=crop&q=80",
    icon: FaShieldAlt,
    gradient: "from-blue-900 to-black",
    accentColor: "text-blue-400"
  },
  {
    id: 3,
    name: "MUAY THAI",
    subtitle: "Ciencia de los 8 miembros", 
    description: "El arte marcial nacional de Tailandia. Utiliza puños, codos, rodillas y tibias para crear el striking más devastador y completo del mundo.",
    benefits: [
      "Domina el striking más completo con 8 puntos de contacto",
      "Desarrolla potencia explosiva y resistencia mental",
      "Mejora flexibilidad, balance y coordinación natural",
      "Cultiva mentalidad de guerrero tradicional tailandés"
    ],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&q=80",
    icon: FaFire,
    gradient: "from-orange-900 to-black",
    accentColor: "text-orange-400"
  },
  {
    id: 4,
    name: "KICKBOXING",
    subtitle: "Striking explosivo y dinámico",
    description: "Combina las mejores técnicas de boxeo occidental con patadas devastadoras. Perfect para desarrollar velocidad, poder y acondicionamiento cardiovascular extremo.",
    benefits: [
      "Combina puños precisos con patadas devastadoras",
      "Quema calorías masivamente mientras builds músculo",
      "Desarrolla coordinación y reflejos lightning-fast",
      "Construye confianza y libera estrés accumulated"
    ],
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=600&fit=crop&q=80",
    icon: FaBolt,
    gradient: "from-purple-900 to-black",
    accentColor: "text-purple-400"
  }
];

export default function DisciplinesGrid() {
  return (
    <section id="disciplinas" className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-[var(--accent)]/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent)]/2 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-full px-6 py-3 mb-8">
            <FaFistRaised className="text-[var(--accent)] text-xl" />
            <span className="text-[var(--accent)] font-bold tracking-wide">NUESTRAS ESPECIALIDADES</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Disciplinas que <span className="text-[var(--accent)]">dominamos</span>
          </h2>
          <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
            Cada arte marcial es una ciencia perfecta. Elige la que resuene con tu espíritu guerrero 
            <span className="text-[var(--accent)] font-semibold"> o domínalas todas.</span>
          </p>
        </motion.div>

        {/* Grid de disciplinas numeradas */}
        <div className="grid gap-8 lg:grid-cols-2">
          {disciplines.map((discipline, index) => (
            <motion.div
              key={discipline.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-600/30 hover:border-[var(--accent)]/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[var(--accent)]/20">
                
                {/* Imagen de fondo con overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={discipline.image}
                    alt={discipline.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${discipline.gradient} opacity-80 group-hover:opacity-60 transition-opacity duration-500`}></div>
                  
                  {/* Número gigante estilo ACE */}
                  <div className="absolute top-8 left-8">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                      viewport={{ once: true }}
                      className="w-20 h-20 bg-[var(--accent)] rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white/20"
                    >
                      <span className="text-black text-4xl font-black">
                        {discipline.id}
                      </span>
                    </motion.div>
                  </div>

                  {/* Icono decorativo */}
                  <div className="absolute top-8 right-8">
                    <motion.div
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-[var(--accent)]/50"
                    >
                      <discipline.icon className={`text-2xl ${discipline.accentColor}`} />
                    </motion.div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-8">
                  <motion.h3
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-[var(--accent)] transition-colors duration-300"
                  >
                    {discipline.name}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                    className={`font-semibold text-lg mb-4 ${discipline.accentColor}`}
                  >
                    {discipline.subtitle}
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                    viewport={{ once: true }}
                    className="text-white/90 text-lg leading-relaxed mb-6"
                  >
                    {discipline.description}
                  </motion.p>

                  {/* Lista de beneficios */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.7 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                  >
                    {discipline.benefits.map((benefit, benefitIndex) => (
                      <motion.div
                        key={benefitIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.2 + 0.8 + (benefitIndex * 0.1) }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 group/benefit"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-2 h-2 bg-[var(--accent)] rounded-full group-hover/benefit:scale-150 transition-transform duration-300"></div>
                        </div>
                        <p className="text-white/80 group-hover:text-white transition-colors duration-300">
                          {benefit}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Línea decorativa */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 1 }}
                    viewport={{ once: true }}
                    className="w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mt-8 origin-center"
                  ></motion.div>
                </div>

                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[var(--accent)]/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿No sabes por dónde <span className="text-[var(--accent)]">empezar?</span>
            </h3>
            <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              En tu clase gratuita, evaluaremos tus objetivos y te recomendaremos 
              la disciplina perfecta para iniciar tu transformación.
            </p>
            <motion.button
              onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-button text-xl px-12 py-5"
            >
              Descubrir mi disciplina ideal
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
