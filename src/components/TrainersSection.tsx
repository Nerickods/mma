'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaTrophy } from 'react-icons/fa';

const coaches = [
  {
    id: 1,
    name: "Carlos Mendez",
    role: "Head Coach", 
    specialty: "Muay Thai & Kickboxing Specialist",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=face&q=80&auto=format&sat=-100",
    social: { instagram: "#", facebook: "#" }
  },
  {
    id: 2,
    name: "Ana Rodriguez", 
    role: "BJJ Coach",
    specialty: "Brazilian Jiu-Jitsu Black Belt",
    image: "https://images.unsplash.com/photo-1594736797933-d0dcc4ba7423?w=400&h=600&fit=crop&crop=face&q=80&auto=format&sat=-100",
    social: { instagram: "#", facebook: "#" }
  },
  {
    id: 3,
    name: "Miguel Torres",
    role: "Boxing Coach", 
    specialty: "Professional Boxing & MMA",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=600&fit=crop&crop=face&q=80&auto=format&sat=-100",
    social: { instagram: "#", facebook: "#" }
  }
];

export default function TrainersSection() {
  return (
    <section id="entrenadores" className="py-24 bg-gradient-to-br from-[var(--accent)] via-yellow-400 to-[var(--accent)] relative overflow-hidden">
      {/* Elementos decorativos sutiles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-black/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-black/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header estilo ACE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-sm border border-black/30 rounded-full px-6 py-3 mb-8">
            <FaTrophy className="text-black text-xl" />
            <span className="text-black font-bold tracking-wide uppercase">NUESTRO EQUIPO</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-black mb-6 leading-tight tracking-tight">
            Meet our warrior
            <br/>
            <span className="relative">
              coaches
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

        {/* Grid de coaches estilo ACE minimalista */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Card minimalista estilo ACE */}
              <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-6 border border-black/30 hover:bg-black/30 hover:border-black/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                
                {/* Imagen en B&N profesional */}
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img
                    src={coach.image}
                    alt={`${coach.name} - ${coach.role}`}
                    className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.9)' }}
                  />
                  
                  {/* Overlay sutil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500"></div>
                  
                  {/* Redes sociales elegantes */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <motion.a
                      href={coach.social.instagram}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-colors duration-300"
                    >
                      <FaInstagram className="text-sm" />
                    </motion.a>
                    <motion.a
                      href={coach.social.facebook}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-colors duration-300"
                    >
                      <FaFacebook className="text-sm" />
                    </motion.a>
                  </div>
                </div>

                {/* Información minimalista */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-2 group-hover:text-black/80 transition-colors duration-300">
                    {coach.name}
                  </h3>
                  
                  <div className="bg-black/30 rounded-full px-4 py-2 mb-3 inline-block">
                    <p className="text-black font-bold text-sm uppercase tracking-wide">
                      {coach.role}
                    </p>
                  </div>
                  
                  <p className="text-black/80 font-medium">
                    {coach.specialty}
                  </p>

                  {/* Línea decorativa minimalista */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                    className="w-16 h-0.5 bg-black/40 mx-auto mt-6 group-hover:w-full group-hover:bg-black/60 transition-all duration-500 origin-center"
                  ></motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA estilo ACE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-black/20 backdrop-blur-sm border border-black/30 rounded-3xl p-10 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Train with the <span className="underline decoration-black/40 decoration-4">best warriors</span>
            </h3>
            <p className="text-black/80 text-xl mb-8 max-w-2xl mx-auto">
              Cada coach tiene décadas de experiencia y resultados comprobados. 
              Tu primera clase con cualquiera de ellos es completamente gratuita.
            </p>
            <motion.button
              onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-[var(--accent)] px-12 py-4 rounded-xl font-bold text-xl border-2 border-black hover:bg-black/90 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Meet your coach
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

