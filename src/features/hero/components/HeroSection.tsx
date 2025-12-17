'use client';

import { motion } from 'framer-motion';
import { useHeroAnimations } from '../hooks/useHeroAnimations';
import { heroCarouselRows, heroContent, disciplinesBannerText, handleImageError } from '../services/heroData';
import { HeroSectionProps } from '../types/hero';

export default function HeroSection({ onCtaClick, animationConfig }: HeroSectionProps) {
  const { animations } = useHeroAnimations(animationConfig);

  const scrollToForm = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      heroContent.cta.action();
    }
  };

  // Duplicate items for seamless loop
  const bannerItems = [...disciplinesBannerText, ...disciplinesBannerText, ...disciplinesBannerText, ...disciplinesBannerText];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* Carrusel de fotos de fondo */}
      <div className="absolute inset-0 z-0 flex flex-col">

        {/* Fila superior - Movimiento hacia la izquierda */}
        {/* Fila superior - Movimiento hacia la izquierda */}
        <div className="relative w-full h-[50vh] overflow-hidden border-b-2 border-[#D4AF37]/20">
          <motion.div
            className="flex gap-0 absolute top-0 left-0 h-full"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 60, // Slower, more majestic
              ease: "linear",
              repeat: Infinity
            }}
            style={{ width: "400%" }} // Wider container for x4
          >
            {/* x4 Duplication for seamless loop on large screens */}
            {[...heroCarouselRows[0].images, ...heroCarouselRows[0].images, ...heroCarouselRows[0].images, ...heroCarouselRows[0].images].map((image, index) => (
              <div key={`row1-${index}`} className="flex-shrink-0 h-full w-[25vw] min-w-[300px] relative border-r border-black/50">
                <img
                  src={image.src}
                  onError={(e) => handleImageError(e, image.fallback)}
                  alt={image.alt}
                  className="h-full w-full object-cover opacity-100 filter grayscale contrast-110 brightness-110 hover:brightness-125 transition-all duration-700"
                />
                {/* Gold tint overlay on hover/active */}
                <div className="absolute inset-0 bg-[#D4AF37]/0 hover:bg-[#D4AF37]/10 transition-colors duration-500"></div>
              </div>
            ))}
          </motion.div>
          {/* Bottom gradient for smooth text readability - Reduced */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Separator Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent z-10 hidden md:block"></div>

        {/* Fila inferior - Movimiento hacia la derecha */}
        <div className="relative w-full h-[50vh] overflow-hidden border-t-2 border-[#D4AF37]/20">
          <motion.div
            className="flex gap-0 absolute top-0 left-0 h-full"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 70, // Even slower
              ease: "linear",
              repeat: Infinity
            }}
            style={{ width: "400%" }}
          >
            {/* x4 Duplication */}
            {[...heroCarouselRows[1].images, ...heroCarouselRows[1].images, ...heroCarouselRows[1].images, ...heroCarouselRows[1].images].map((image, index) => (
              <div key={`row2-${index}`} className="flex-shrink-0 h-full w-[25vw] min-w-[300px] relative border-l border-black/50">
                <img
                  src={image.src}
                  onError={(e) => handleImageError(e, image.fallback)}
                  alt={image.alt}
                  className="h-full w-full object-cover opacity-100 filter grayscale contrast-110 brightness-110 hover:brightness-125 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[#D4AF37]/0 hover:bg-[#D4AF37]/10 transition-colors duration-500"></div>
              </div>
            ))}
          </motion.div>
          {/* Top gradient for smooth text readability - Reduced */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Removed aggressive global gradients that were obscuring images */}
      </div>

      {/* Contenido principal del hero - Add subtle background for text only */}
      <motion.div
        {...animations.fadeInUp()}
        className="container mx-auto px-6 py-24 text-center relative z-20 max-w-6xl"
      >
        {/* Resplandor dorado de fondo para el texto */}
        <div className="absolute inset-0 bg-[var(--accent)]/5 rounded-3xl blur-3xl pointer-events-none"></div>

        <div className="relative">
          <motion.h1
            {...animations.titleAnimation()}
            className="text-5xl md:text-7xl lg:text-9xl font-black text-white mb-8 leading-none tracking-tighter"
            style={{
              textShadow: '0 0 40px rgba(0,0,0,0.8)'
            }}
          >
            {heroContent.title.main}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-yellow-200 to-[var(--accent)] relative">
              {heroContent.title.highlight}
            </span>
          </motion.h1>

          <motion.p
            {...animations.subtitleAnimation()}
            className="text-lg md:text-2xl text-gray-300 mb-10 font-light max-w-3xl mx-auto leading-relaxed"
          >
            {heroContent.subtitle.split('GRATIS').map((part, index, array) => (
              <span key={index}>
                {part}
                {index < array.length - 1 && (
                  <span className="text-[var(--accent)] font-bold">GRATIS</span>
                )}
              </span>
            ))}
          </motion.p>

          <motion.div
            {...animations.ctaAnimation()}
            className="mt-12"
          >
            <motion.button
              onClick={scrollToForm}
              {...animations.buttonHover}
              className="cta-button text-lg md:text-xl px-12 py-5 relative overflow-hidden group bg-[var(--accent)] text-black font-black tracking-wider uppercase"
            >
              <span className="relative z-10">{heroContent.cta.text}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Banner de disciplinas corrido estilo ACE */}
      <div className="absolute bottom-0 left-0 w-full bg-[var(--accent)] py-3 overflow-hidden z-20 border-t-4 border-black">
        <motion.div
          className="whitespace-nowrap flex gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity
          }}
          style={{ width: "fit-content" }}
        >
          {bannerItems.map((item, index) => (
            <span key={index} className="text-black font-black text-xl md:text-2xl tracking-widest uppercase flex items-center gap-8">
              {item} <span className="text-black/30">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}