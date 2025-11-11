'use client';

import { motion } from 'framer-motion';
import Header from "@/components/Header";
import ResultsSection from "@/components/ResultsSection";
import ScheduleGrid from "@/components/ScheduleGrid";
import WhyTheBest from "@/components/WhyTheBest";
import DisciplinesGrid from "@/components/DisciplinesGrid";
import TrainersSection from "@/components/TrainersSection";
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
        {/* 1. INICIO - Hero Section con carrusel de fotos */}
        <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          
          {/* Carrusel de fotos de fondo */}
          <div className="absolute inset-0 z-0">
            
            {/* Fila superior - Movimiento hacia la izquierda */}
            <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden">
              <motion.div 
                animate={{ x: [0, -2000] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex gap-4 h-full"
              >
                {/* Duplicamos las imágenes para loop infinito */}
                {[...Array(3)].map((_, setIndex) => (
                  <div key={setIndex} className="flex gap-4 h-full">
                    <img src="/images/gym-group-training.jpeg" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80"; }} alt="Entrenamiento grupal octágono Blackbird House" className="h-full w-80 object-cover opacity-70" />
                    <img src="/images/muay-thai-sparring.jpeg" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop&q=80"; }} alt="Sparring Muay Thai femenino intenso" className="h-full w-80 object-cover opacity-70" />
                    <img src="/images/jiu-jitsu-ground.jpeg" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1594736797933-d0dcc4ba7423?w=400&h=300&fit=crop&q=80"; }} alt="Técnicas de Jiu Jitsu en el suelo" className="h-full w-80 object-cover opacity-70" />
                    <img src="/images/boxing-training.jpeg" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop&q=80"; }} alt="Entrenamiento de boxeo profesional" className="h-full w-80 object-cover opacity-70" />
                    <img src="/images/gym-facilities.jpeg" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=300&fit=crop&q=80"; }} alt="Instalaciones premium Blackbird House" className="h-full w-80 object-cover opacity-70" />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Fila inferior - Movimiento hacia la derecha */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden">
              <motion.div 
                animate={{ x: [-2000, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="flex gap-4 h-full"
              >
                {/* Duplicamos las imágenes para loop infinito */}
                {[...Array(3)].map((_, setIndex) => (
                  <div key={setIndex} className="flex gap-4 h-full">
                    <img src="/images/conditioning-class.jpeg" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=300&fit=crop&q=80"; }} alt="Clase de acondicionamiento físico" className="h-full w-80 object-cover opacity-70" />
                    <img src="/images/octagon-training.jpeg" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80"; }} alt="Entrenamiento intenso en octágono" className="h-full w-80 object-cover opacity-70" />
                    <img src="/images/women-grappling.jpeg" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1594736797933-d0dcc4ba7423?w=400&h=300&fit=crop&q=80"; }} alt="Grappling femenino profesional" className="h-full w-80 object-cover opacity-70" />
                    <img src="/images/team-training.jpeg" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop&q=80"; }} alt="Entrenamiento en equipo Blackbird" className="h-full w-80 object-cover opacity-70" />
                    <img src="/images/facilities-overview.jpeg" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80"; }} alt="Vista general instalaciones" className="h-full w-80 object-cover opacity-70" />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Gradientes para resaltar el copy */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent"></div>
          </div>
          
          {/* Contenido principal del hero */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="container mx-auto px-6 py-24 text-center relative z-20 max-w-6xl"
          >
            {/* Resplandor dorado de fondo para el texto */}
            <div className="absolute inset-0 bg-[var(--accent)]/5 rounded-3xl blur-3xl"></div>
            
            <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight"
                style={{
                  textShadow: '6px 6px 20px rgba(0,0,0,0.9), 0 0 40px rgba(255,215,0,0.3)',
                  filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.4))'
                }}
              >
                Deja de ser un
                <br/>
                <span className="text-[var(--accent)] relative">
                  ESPECTADOR MÁS
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-[var(--accent)]/20 rounded-lg blur-xl"
                  ></motion.div>
                </span>
            </motion.h1>
            
              <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
                className="text-lg md:text-xl text-white/95 mb-8 font-medium max-w-4xl mx-auto leading-relaxed"
                style={{
                  textShadow: '4px 4px 12px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8)',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '12px',
                  padding: '16px 24px'
                }}
              >
                473 guerreros transformados. 0 experiencia requerida. Tu primera batalla empieza <span className="text-[var(--accent)] font-black">GRATIS</span>.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12"
            >
                <motion.button 
                  onClick={scrollToForm}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 60px rgba(255, 215, 0, 0.6), 0 0 80px rgba(255, 215, 0, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="cta-button text-lg md:text-xl px-12 py-5 relative overflow-hidden"
                  style={{
                    boxShadow: '0 10px 40px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3)'
                  }}
                >
                  <span className="relative z-10 font-black">EMPEZAR MI TRANSFORMACIÓN</span>
                  
                  {/* Efecto de resplandor animado */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/30 via-[var(--accent)]/60 to-[var(--accent)]/30 blur-sm"
                  ></motion.div>
                </motion.button>
              </motion.div>
              </div>
          </motion.div>

          {/* Banner de disciplinas corrido estilo ACE */}
          <div className="absolute bottom-0 left-0 w-full bg-[var(--accent)] py-3 overflow-hidden z-20">
            <div className="whitespace-nowrap animate-scroll">
              <span className="text-black font-black text-base md:text-xl tracking-wider">
                BOXEO • MUAY THAI • JIU JITSU • GRAPPLING • KICKBOXING • ARTES MARCIALES MIXTAS • BOXEO • MUAY THAI • JIU JITSU • GRAPPLING • KICKBOXING • 
              </span>
              </div>
          </div>
        </section>

        {/* 2. MISIÓN - Rediseñada con esencia ACE */}
        <section id="mision" className="py-16 bg-gradient-to-br from-black via-gray-900 to-black relative">
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
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
                    Transformamos <span className="text-[var(--accent)]">hombres comunes</span> en guerreros legendarios
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
                    Desde el principiante que nunca ha puesto un guante hasta el competidor que busca el título,
                    <span className="text-[var(--accent)] font-black"> forjamos campeones donde otros solo ven gente ordinaria.</span>
                  </p>

                  <p className="text-white/80 text-lg leading-relaxed">
                    Blackbird House no es solo un gimnasio. Es un campo de batalla donde se decide si serás víctima o victorioso.
              </p>
            </motion.div>
            
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-black/40 border border-[var(--accent)]/30 rounded-2xl p-6"
                >
                  <p className="text-[var(--accent)] font-black text-lg text-center">
                    &ldquo;El guerrero promedio duerme 8 horas. El campeón duerme 6 y sueña 2 con la victoria.&rdquo;
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. TRANSFORMACIONES REALES - Prueba social CRÍTICA */}
        <ResultsSection />

        {/* 3. ELIGE TU BATALLA - Horarios con CTAs directos (MÁXIMA CONVERSIÓN) */}
        <ScheduleGrid />

        {/* 4. DISCIPLINAS - Grid numerado estilo ACE */}
        <DisciplinesGrid />

        {/* 5. POR QUÉ SOMOS LOS MEJORES - Nueva sección */}
        <WhyTheBest />

        {/* 6. COACHES - Estilo ACE minimalista */}
        <TrainersSection />

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