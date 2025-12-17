'use client';

import { motion } from 'framer-motion';
import Header from "@/components/Header";
import HeroDoubleCarousel from "@/features/hero/components/HeroDoubleCarousel";
import FacilitiesSection from "@/components/FacilitiesSection";
import MissionSection from "@/components/MissionSection";
import TrainingProgramSection from "@/components/TrainingProgramSection";
import WhyAndTeam from "@/features/experience/components/WhyAndTeam"; // Unified
import FAQSection from "@/components/FAQSection";
import EnrollForm from "@/components/EnrollForm";
import Footer from "@/components/Footer";

export default function Home() {
  const scrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-['Poppins'] bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main>
        {/* 1. INICIO - Hero Section Dual Infinite Carousel (Black & White Luxury) */}
        <HeroDoubleCarousel />

        {/* 2. MISIÓN - Rediseñada con esencia ACE */}
        <MissionSection />

        {/* 2. INSTALACIONES - Bento Grid con Lightbox */}
        <FacilitiesSection />

        {/* 3. PROGRAMA DE ENTRENAMIENTO - Unified Disciplines & Schedule */}
        <TrainingProgramSection />

        {/* 5. EXPERIENCIA & TEAM - Unified Section */}
        <WhyAndTeam />

        {/* 7. FAQ - Preguntas que separan campeones de víctimas */}
        <FAQSection />

        {/* 8. FORMULARIO - Optimizado */}
        <section id="formulario" className="py-16 bg-gradient-to-br from-black via-gray-900 to-black relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--accent)]/10 via-transparent to-transparent"></div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-3 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-full px-6 py-3 mb-8">
                <span className="text-[var(--accent)] font-bold tracking-wide">COMENZAR HOY</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                Tu primera <span className="text-[var(--accent)]">victoria</span> empieza ahora
              </h2>
              <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
                Los campeones no nacen, se forjan. Tu clase gratuita es el primer paso.
                <span className="text-[var(--accent)] font-black"> ¿Estás listo para entrar al ring?</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <EnrollForm />
            </motion.div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER */}
      <Footer />
    </div>
  );
}