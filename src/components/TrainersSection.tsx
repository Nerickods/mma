'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaTrophy, FaMedal, FaFire } from 'react-icons/fa';

const trainers = [
  {
    id: 1,
    name: "Carlos Mendez",
    specialty: "Muay Thai & Kickboxing",
    experience: "15 años",
    achievements: "Campeón Nacional Muay Thai",
    bio: "Especialista en técnicas de golpeo explosivo y acondicionamiento físico de élite. Transforma principiantes en guerreros.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=face&q=80",
    social: { instagram: "#", facebook: "#" }
  },
  {
    id: 2,
    name: "Ana Rodriguez",
    specialty: "Brazilian Jiu-Jitsu",
    experience: "12 años",
    achievements: "Cinturón Negro BJJ",
    bio: "Maestra en técnicas de sumisión y defensa personal femenina. Desarrolla confianza inquebrantable en cada alumna.",
    image: "https://images.unsplash.com/photo-1594736797933-d0dcc4ba7423?w=400&h=500&fit=crop&crop=face&q=80",
    social: { instagram: "#", facebook: "#" }
  },
  {
    id: 3,
    name: "Miguel Torres",
    specialty: "Boxeo & MMA Competitivo", 
    experience: "18 años",
    achievements: "Ex-Boxeador Profesional",
    bio: "Estratega de combate con 20 peleas profesionales. Forja mentalidad de campeón y técnica impecable.",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=500&fit=crop&crop=face&q=80",
    social: { instagram: "#", facebook: "#" }
  }
];

export default function TrainersSection() {
  return (
    <section id="entrenadores" className="relative py-24 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[var(--accent)]/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent)]/2 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-full px-6 py-3 mb-8"
          >
            <FaTrophy className="text-[var(--accent)] text-xl" />
            <span className="text-[var(--accent)] font-semibold">ENTRENADORES DE ÉLITE</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Aprende de los{' '}
            <span className="text-[var(--accent)] relative">
              mejores
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 w-full h-1 bg-[var(--accent)] origin-left"
              ></motion.div>
            </span>
          </h2>
          <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
            Cada entrenador es un campeón certificado con años de experiencia competitiva. 
            <span className="text-[var(--accent)] font-semibold"> Tu éxito está garantizado.</span>
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Contenedor principal con hover sophisticado */}
              <div className="relative bg-gradient-to-br from-black/80 to-gray-900/50 rounded-3xl overflow-hidden border border-white/10 hover:border-[var(--accent)]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent)]/20 hover:scale-105">
                
                {/* Imagen con efectos avanzados */}
                <div className="relative overflow-hidden">
                  <img
                  src={trainer.image}
                    alt={`${trainer.name} - Entrenador de ${trainer.specialty}`}
                    className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  
                  {/* Overlay con gradiente dinámico */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  {/* Badge de experiencia flotante */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className="absolute top-4 right-4 bg-[var(--accent)] text-black px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                  >
                    {trainer.experience}
                  </motion.div>

                  {/* Iconos de logros animados */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 bg-[var(--accent)]/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-[var(--accent)]/50"
                    >
                      <FaMedal className="text-[var(--accent)] text-lg" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: -360 }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 bg-[var(--accent)]/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-[var(--accent)]/50"
                    >
                      <FaFire className="text-[var(--accent)] text-lg" />
                    </motion.div>
                  </div>

                  {/* Redes sociales con hover elegante */}
                  <div className="absolute bottom-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <motion.a
                      href={trainer.social.instagram}
                      whileHover={{ scale: 1.3, rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center text-black hover:bg-white transition-colors duration-300 shadow-lg"
                    >
                      <FaInstagram className="text-lg" />
                    </motion.a>
                    <motion.a
                      href={trainer.social.facebook}
                      whileHover={{ scale: 1.3, rotate: -15 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center text-black hover:bg-white transition-colors duration-300 shadow-lg"
                    >
                      <FaFacebook className="text-lg" />
                    </motion.a>
                  </div>
                </div>

                {/* Contenido con animaciones escalonadas */}
                <div className="p-8">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors duration-300"
                  >
                    {trainer.name}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                    className="text-[var(--accent)] font-semibold text-lg mb-3"
                  >
                    {trainer.specialty}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                    viewport={{ once: true }}
                    className="bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-lg p-3 mb-4"
                  >
                    <p className="text-[var(--accent)] font-medium text-sm">
                      🏆 {trainer.achievements}
                    </p>
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                    viewport={{ once: true }}
                    className="text-white/80 leading-relaxed"
                  >
                    {trainer.bio}
                  </motion.p>

                  {/* Línea decorativa animada */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.8 }}
                    viewport={{ once: true }}
                    className="w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mt-6 origin-center"
                  ></motion.div>
              </div>

                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[var(--accent)]/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section integrada */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Listo para entrenar con <span className="text-[var(--accent)]">campeones?</span>
            </h3>
            <p className="text-white/70 mb-6">
              Tu primera clase con cualquiera de nuestros entrenadores es completamente gratuita.
            </p>
            <motion.button
              onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-button text-lg px-8 py-4"
            >
              Conocer a mi entrenador
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

