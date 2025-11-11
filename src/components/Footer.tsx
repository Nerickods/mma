'use client';

import { motion } from 'framer-motion';
import { 
  FaInstagram, 
  FaFacebook, 
  FaYoutube, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaFistRaised,
  FaArrowUp
} from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-[var(--accent)]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-yellow-400 rounded-xl flex items-center justify-center">
                <FaFistRaised className="text-black text-xl" />
              </div>
              <div className="text-2xl font-bold">
                <span className="text-white">Blackbird</span>{' '}
                <span className="text-[var(--accent)]">House</span>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              Formamos personalidades íntegras más que atletas. Tu primera clase de prueba es GRATUITA.
            </p>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6 text-white">Disciplinas</h4>
            <ul className="space-y-3">
              {[
                { name: "Artes Marciales Mixtas", id: "inicio" },
                { name: "Jiu Jitsu / Grappling", id: "disciplinas" },
                { name: "Kickboxing", id: "disciplinas" },
                { name: "Muay Thai", id: "disciplinas" },
                { name: "Boxeo", id: "disciplinas" },
                { name: "Acondicionamiento", id: "horarios" }
              ].map((link) => (
                <li key={link.name}>
                  <motion.button
                    whileHover={{ scale: 1.05, x: 10 }}
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/70 hover:text-[var(--accent)] transition-all duration-300"
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6 text-white">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-white/70">
                <FaMapMarkerAlt className="text-[var(--accent)] mt-1 flex-shrink-0" />
                <div>
                  <div>AV. RÍO NILO 4301</div>
                  <div>LOMAS DE LOS PÁJAROS</div>
                  <div>TONALÁ, JALISCO C.P. 45403</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <FaWhatsapp className="text-[var(--accent)]" />
                <span className="font-bold">33 28 14 57 00</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <FaPhone className="text-[var(--accent)]" />
                <span>33 81 90 73</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <FaEnvelope className="text-[var(--accent)]" />
                <span>blackbirdhousem@hotmail.com</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6 text-white">Síguenos</h4>
            <div className="flex gap-4">
              {[
                { icon: FaInstagram, href: "#", color: "hover:text-pink-400" },
                { icon: FaFacebook, href: "#", color: "hover:text-blue-400" },
                { icon: FaYoutube, href: "#", color: "hover:text-red-400" },
                { icon: FaWhatsapp, href: "#", color: "hover:text-green-400" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className={`w-12 h-12 bg-[var(--accent)]/20 rounded-full flex items-center justify-center text-white/70 ${social.color} transition-all duration-300`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-[var(--accent)]/30 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Blackbird House. Todos los derechos reservados.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={scrollToTop}
            className="mt-4 md:mt-0 w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center text-black hover:bg-white transition-all duration-300"
          >
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

