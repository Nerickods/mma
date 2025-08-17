'use client';

import { motion } from 'framer-motion';
import { FaCertificate, FaTrophy, FaFistRaised, FaChartLine, FaGem } from 'react-icons/fa';

interface Differentiator {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const differentiators: Differentiator[] = [
  {
    title: "Entrenadores Certificados Internacionalmente",
    description: "Nuestros coaches poseen certificaciones de las mejores organizaciones mundiales de MMA, garantizando técnicas de élite y metodologías probadas en competencia.",
    icon: FaCertificate
  },
  {
    title: "Metodología Probada en Competencia",
    description: "Sistema de entrenamiento desarrollado y perfeccionado por peleadores profesionales con experiencia real en octágonos y rings de todo el mundo.",
    icon: FaTrophy
  },
  {
    title: "Ambiente Profesional para Guerreros Serios",
    description: "Instalaciones de nivel competitivo y una comunidad comprometida que empuja tus límites. Solo para quienes buscan resultados reales y transformación genuina.",
    icon: FaFistRaised
  },
  {
    title: "Resultados Medibles desde la Primera Clase",
    description: "Metodología estructurada con evaluaciones periódicas y metas claras. Verás progreso tangible en técnica, condición física y mentalidad de guerrero.",
    icon: FaChartLine
  }
];

export default function WhyTheBest() {
  return (
    <section className="py-24 bg-gradient-to-br from-[var(--accent)]/95 via-[var(--accent)] to-yellow-400 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-black/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-black/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-black/5 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Imagen del guerrero (lado izquierdo) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop&crop=face&q=80"
                alt="Guerrero profesional Blackbird House"
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl border-4 border-black/20"
              />
              
              {/* Overlay decorativo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl"></div>
              
              {/* Badge flotante */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -top-4 -right-4 bg-black text-[var(--accent)] p-4 rounded-2xl shadow-xl border-2 border-[var(--accent)]"
              >
                <FaGem className="text-2xl" />
              </motion.div>
            </div>
          </motion.div>

          {/* Contenido principal (lado derecho) */}
          <div className="order-1 lg:order-2">
            
            {/* Header inspirado en ACE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-sm border border-black/30 rounded-full px-6 py-3 mb-8">
                <FaTrophy className="text-black text-xl" />
                <span className="text-black font-bold tracking-wide">LA DIFERENCIA BLACKBIRD</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-black mb-6 leading-tight tracking-tight">
                Por qué somos<br/>
                <span className="relative inline-block">
                  los mejores
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="absolute bottom-0 left-0 w-full h-2 bg-black/30 origin-left"
                  ></motion.div>
                </span>
              </h2>
            </motion.div>

            {/* Lista de diferenciadores */}
            <div className="space-y-8">
              {differentiators.map((diff, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group flex items-start gap-6 p-6 bg-black/10 backdrop-blur-sm rounded-2xl border border-black/20 hover:bg-black/20 hover:border-black/40 transition-all duration-300 hover:scale-[1.02]"
                >
                  
                  {/* Icono diamante dorado */}
                  <div className="flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.4 }}
                      className="w-12 h-12 bg-black text-[var(--accent)] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                    >
                      <diff.icon className="text-xl" />
                    </motion.div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-black mb-3 group-hover:text-black/80 transition-colors duration-300">
                      {diff.title}
                    </h3>
                    <p className="text-black/80 text-lg leading-relaxed group-hover:text-black/90 transition-colors duration-300">
                      {diff.description}
                    </p>
                    
                    {/* Línea decorativa */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                      viewport={{ once: true }}
                      className="w-0 group-hover:w-full h-0.5 bg-black/30 mt-4 transition-all duration-500 origin-left"
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA final */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <div className="bg-black/20 backdrop-blur-sm border border-black/30 rounded-2xl p-8">
                <p className="text-black text-xl font-bold mb-6">
                  ¿Listo para experimentar la <span className="underline decoration-black/40 decoration-4">diferencia real?</span>
                </p>
                <motion.button
                  onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-[var(--accent)] px-10 py-4 rounded-xl font-bold text-lg border-2 border-black hover:bg-black/90 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Descubrir mi potencial
                </motion.button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
