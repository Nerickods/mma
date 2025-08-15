'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaFistRaised } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Beneficios', id: 'beneficios' },
    { name: 'Instalaciones', id: 'instalaciones' },
    { name: 'Entrenadores', id: 'entrenadores' },
    { name: 'Testimonios', id: 'testimonios' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-lg border-b border-[var(--accent)]/30 shadow-2xl shadow-[var(--accent)]/10' 
          : 'bg-black/50 backdrop-blur-sm border-b border-white/10'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo con efectos premium */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('inicio')}
          className="cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-br from-[var(--accent)] to-yellow-400 rounded-lg flex items-center justify-center shadow-lg"
            >
              <FaFistRaised className="text-black text-lg" />
            </motion.div>
            <div className="text-xl md:text-2xl font-bold tracking-wide">
              <span className="text-white group-hover:text-[var(--accent)] transition-colors duration-300">Blackbird</span>{' '}
              <span className="text-[var(--accent)] group-hover:text-white transition-colors duration-300">House</span>
            </div>
          </div>
        </motion.div>

        {/* Navegación desktop con efectos sofisticados */}
        <nav className="hidden lg:flex items-center gap-8">
          {navigationItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.id)}
              className="group relative px-4 py-2 rounded-lg font-medium text-white/80 hover:text-[var(--accent)] transition-all duration-300 hover:bg-[var(--accent)]/10"
            >
              <span className="flex items-center">
                {item.name}
              </span>
              
              {/* Línea animada bajo cada elemento */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent)] origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/10 to-transparent rounded-lg"></div>
              </div>
            </motion.button>
          ))}
        </nav>

        {/* CTA Button con efectos premium */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 215, 0, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('formulario')}
            className="hidden md:block cta-button text-sm lg:text-base px-4 py-2 lg:px-6 lg:py-3 relative overflow-hidden group"
          >
            <span className="relative z-10 font-bold">Clase Gratuita</span>
            
            {/* Efecto de onda al hacer hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-[var(--accent)] opacity-0 group-hover:opacity-100"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* Menú hamburguesa móvil con animación */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 bg-[var(--accent)]/20 border border-[var(--accent)]/50 rounded-lg flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent)]/30 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaTimes className="text-xl" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaBars className="text-xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Menú móvil con efectos premium */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-[var(--accent)]/30"
          >
            <div className="container mx-auto px-6 py-6">
              <div className="space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection(item.id)}
                    className="group w-full text-left px-4 py-3 rounded-lg bg-[var(--accent)]/5 hover:bg-[var(--accent)]/15 border border-[var(--accent)]/20 hover:border-[var(--accent)]/50 transition-all duration-300"
                  >
                    <span className="flex items-center text-white group-hover:text-[var(--accent)] transition-colors duration-300">
                      <span className="font-medium">{item.name}</span>
                    </span>
                  </motion.button>
                ))}
                
                {/* CTA móvil */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('formulario')}
                  className="w-full cta-button text-lg py-4 mt-4"
                >
                  Reservar Clase Gratuita
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Línea de progreso de scroll */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[var(--accent)] to-yellow-400 origin-left"
        style={{
          scaleX: isScrolled ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.header>
  );
}