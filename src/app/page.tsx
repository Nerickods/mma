'use client';

import { motion } from 'framer-motion';
import Header from "@/components/Header";
import StatsSection from "@/components/StatsSection";
import WhyTheBest from "@/components/WhyTheBest";
import DisciplinesGrid from "@/components/DisciplinesGrid";
import TrainersSection from "@/components/TrainersSection";
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
        {/* 1. INICIO - Hero Section + Banner disciplinas */}
        <section id="inicio" className="relative min-h-screen overflow-hidden">
          
          {/* Hero principal */}
          <div className="relative min-h-screen flex items-center justify-center">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop&q=80" 
                alt="Experience combat training like never before - Blackbird House"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="container mx-auto px-6 py-24 text-center relative z-10 max-w-6xl"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-9xl font-black text-white mb-8 leading-none tracking-tight"
                style={{ textShadow: '4px 4px 12px rgba(0,0,0,0.8)' }}
              >
                Experience combat training
                <br/>
                <span className="text-[var(--accent)] drop-shadow-xl">like never before</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/90 mb-8 font-medium max-w-4xl mx-auto leading-relaxed"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
              >
                Bienvenido al estudio de entrenamiento de deportes de combate y fitness favorito de Guadalajara
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12"
              >
                <button 
                  onClick={scrollToForm}
                  className="cta-button text-xl md:text-2xl px-12 py-6 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  RESERVAR CLASE GRATUITA
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Banner de disciplinas corrido estilo ACE */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-0 w-full bg-[var(--accent)] py-4 overflow-hidden"
          >
            <div className="whitespace-nowrap animate-scroll">
              <span className="text-black font-black text-lg md:text-2xl tracking-wider">
                MMA • CORE FITNESS • BOXING • MUAY THAI • JIU JITSU • KICKBOXING • MMA • CORE FITNESS • BOXING • MUAY THAI • JIU JITSU • KICKBOXING • 
              </span>
            </div>
          </motion.div>
        </section>

        {/* Sección de estadísticas impactantes */}
        <StatsSection />

        {/* 2. MISIÓN - Rediseñada con esencia ACE */}
        <section id="mision" className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-[var(--accent)]/3 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Imagen del equipo estilo ACE */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative order-2 lg:order-1"
              >
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80"
                    alt="Equipo Blackbird House MMA"
                    className="w-full rounded-3xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl"></div>
                </div>
              </motion.div>

              {/* Contenido de misión */}
              <div className="order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <div className="inline-flex items-center gap-3 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-full px-6 py-3 mb-8">
                    <span className="text-[var(--accent)] font-bold tracking-wide">NUESTRA MISIÓN</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                    En Blackbird House estamos en una misión para empoderar luchadores
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-3xl p-8 mb-8"
                >
                  <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6">
                    Desde aspirantes amateurs hasta veteranos curtidos en batalla, proporcionando una plataforma que reconoce su 
                    <span className="text-[var(--accent)] font-bold"> dedicación, disciplina y búsqueda implacable de la excelencia.</span>
                  </p>
                  
                  <p className="text-white/80 text-lg leading-relaxed">
                    Blackbird House MMA nació de una pasión por los deportes de combate y la admiración por aquellos que se atreven a entrar en la zona de batalla.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-black/40 border border-[var(--accent)]/30 rounded-2xl p-6"
                >
                  <p className="text-[var(--accent)] font-bold text-lg text-center">
                    "Comenzamos como un pequeño grupo de luchadores, entrenadores y fanáticos que querían crear un espacio donde los luchadores pudieran prosperar."
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. DISCIPLINAS - Grid numerado estilo ACE */}
        <DisciplinesGrid />

        {/* 4. POR QUÉ SOMOS LOS MEJORES - Nueva sección */}
        <WhyTheBest />

        {/* 5. COACHES - Estilo ACE minimalista */}
        <TrainersSection />

        {/* 6. FORMULARIO - Optimizado */}
        <section id="formulario" className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--accent)]/10 via-transparent to-transparent"></div>
            <div className="absolute top-20 left-1/4 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-[var(--accent)]/3 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
          
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
                Reserva tu <span className="text-[var(--accent)]">clase gratuita</span>
              </h2>
              <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
                Completa tus datos y te contactaremos para confirmar tu clase de prueba sin costo. 
                <span className="text-[var(--accent)] font-semibold"> Tu transformación comienza aquí.</span>
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

      {/* 7. FOOTER */}
      <Footer />
    </div>
  );
}