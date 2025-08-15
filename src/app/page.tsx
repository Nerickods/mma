'use client';

import { motion } from 'framer-motion';
import Header from "@/components/Header";
import EnrollForm from "@/components/EnrollForm";
import TrainersSection from "@/components/TrainersSection";
import Footer from "@/components/Footer";
import { 
  FaCheckCircle, 
  FaBrain, 
  FaTrophy, 
  FaGift, 
  FaHeart,
  FaQuoteLeft 
} from 'react-icons/fa';

export default function Home() {
  const scrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-['Poppins'] bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main>
        {/* 1. Hero Section */}
        <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop&q=80" 
              alt="Entrenamiento premium Blackbird House"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 overlay"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="container mx-auto px-6 py-24 text-center relative z-10 max-w-4xl"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
            >
              Transforma tu rendimiento en solo una clase…{' '}
              <span className="text-[var(--accent)]">y gratis</span>
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 font-medium"
            >
              Descubre en 60 minutos lo que otros tardan meses en aprender. 
              <span className="text-[var(--accent)] font-semibold"> Cupos limitados.</span>
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10"
            >
              <button 
                onClick={scrollToForm}
                className="cta-button text-lg md:text-xl px-8 py-4 md:px-12 md:py-5"
              >
                Agendar mi clase gratuita ahora
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. Beneficios claros */}
        <section id="beneficios" className="py-20 bg-[var(--gray-light)] relative overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-1/4 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-[var(--accent)]/3 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
                ¿Por qué tomar esta <span className="text-[var(--accent)]">clase gratuita?</span>
              </h2>
            </motion.div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {[
                { icon: FaTrophy, text: "Aprende técnicas efectivas desde el primer minuto" },
                { icon: FaBrain, text: "Recibe retroalimentación personalizada" },
                { icon: FaCheckCircle, text: "Mejora tu rendimiento de forma inmediata" },
                { icon: FaGift, text: "Sin compromiso, sin pago, solo resultados" },
                { icon: FaHeart, text: "Vive la experiencia Blackbird House" },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
                  className="group flex items-start gap-4 p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[var(--accent)]/20 transition-all duration-500 hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-[var(--accent)]/5 border border-transparent hover:border-[var(--accent)]/30"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[var(--accent)] to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-[var(--accent)]/40 group-hover:scale-110 transition-all duration-500">
                    <benefit.icon className="text-black text-2xl group-hover:animate-pulse" />
                  </div>
                  <div>
                    <p className="text-black font-semibold text-xl leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{benefit.text}</p>
                    <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-[var(--accent)] to-yellow-400 transition-all duration-700 mt-2 rounded-full"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Realidad vs Transformación */}
        <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
          {/* Efectos de fondo premium */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--accent)]/8 via-transparent to-transparent"></div>
            <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--accent)]/4 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-[var(--accent)]/6 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent)]/3 rounded-full blur-3xl opacity-50"></div>
          </div>
          
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                ¿Te reconoces en estas <span className="text-[var(--accent)]">frustraciones?</span>
              </h2>
              <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
                Cada día que pasa sin el entrenamiento correcto, te alejas más de quien podrías ser...
              </p>
            </motion.div>
            
            <div className="grid gap-8 lg:grid-cols-3 mb-16 max-w-7xl mx-auto">
              {[
                {
                  title: "Estancamiento Frustrante",
                  description: "Entrenas duro pero los resultados no llegan. Sientes que no importa cuánto esfuerzo pongas, sigues en el mismo lugar.",
                  intensity: "Months of effort... zero progress"
                },
                {
                  title: "Motivación Que Se Desvanece", 
                  description: "Empiezas con energía pero después de unas semanas lo dejas. El ciclo se repite y la culpa crece.",
                  intensity: "Starting again... and again..."
                },
                {
                  title: "Métodos Que No Funcionan",
                  description: "Has probado diferentes enfoques pero ninguno te da la confianza y resultados que buscas realmente.",
                  intensity: "Wasted time, wasted money"
                }
              ].map((struggle, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Borde animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 via-gray-400/30 to-gray-600/20 rounded-2xl blur-sm group-hover:from-[var(--accent)]/30 group-hover:via-[var(--accent)]/50 group-hover:to-[var(--accent)]/30 transition-all duration-700"></div>
                  
                  <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/30 group-hover:border-[var(--accent)]/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[var(--accent)]/20">
                    {/* Indicador de intensidad */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-2 h-8 bg-gradient-to-t from-gray-600 to-gray-400 rounded-full group-hover:from-[var(--accent)]/60 group-hover:to-[var(--accent)] transition-all duration-500" />
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm font-medium group-hover:text-[var(--accent)] transition-colors duration-300">{struggle.intensity}</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[var(--accent)] transition-colors duration-300">
                      {struggle.title}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                      {struggle.description}
                    </p>
                    
                    {/* Línea de progreso que simula frustración */}
                    <div className="mt-6 w-full bg-gray-700 rounded-full h-1 overflow-hidden">
                      <div className="w-0 group-hover:w-full h-full bg-gradient-to-r from-gray-500 to-[var(--accent)] transition-all duration-1000 ease-out"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Transición visual hacia la solución */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-gray-800/50 to-gray-700/30 backdrop-blur-sm rounded-full px-8 py-4 border border-gray-600/30">
                <div className="w-4 h-4 bg-gray-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                <div className="w-4 h-4 bg-[var(--accent)] rounded-full animate-pulse delay-500"></div>
                <span className="text-white/70 font-medium">Pero existe una mejor manera...</span>
              </div>
            </motion.div>

            {/* Solución premium */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative max-w-5xl mx-auto"
            >
              {/* Resplandor de fondo */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/20 via-[var(--accent)]/30 to-[var(--accent)]/20 rounded-3xl blur-xl"></div>
              
              <div className="relative bg-gradient-to-br from-[var(--accent)] via-yellow-400 to-[var(--accent)] rounded-3xl p-1">
                <div className="bg-gradient-to-br from-black/5 to-black/10 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm">
                  <h3 className="text-3xl md:text-5xl font-black text-black mb-6 tracking-tight">
                    LA TRANSFORMACIÓN
                  </h3>
                  <div className="w-24 h-1 bg-black/30 rounded-full mx-auto mb-8"></div>
                  <p className="text-black text-xl md:text-2xl font-bold leading-relaxed mb-8">
                    En una sola clase <span className="underline decoration-black/30 decoration-4">gratuita</span> experimentarás 
                    un método probado que te dará resultados inmediatos y la claridad que necesitas para avanzar.
                  </p>
                  <div className="flex flex-wrap justify-center gap-6 text-black/80 font-semibold">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black/50 rounded-full"></div>
                      Técnicas efectivas al instante
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black/50 rounded-full"></div>
                      Atención 100% personalizada
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black/50 rounded-full"></div>
                      Resultados desde el día 1
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. Instalaciones */}
        <section id="instalaciones" className="py-20 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-40 h-40 bg-[var(--accent)]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-32 h-32 bg-[var(--accent)]/3 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
                Entrena en un espacio <span className="text-[var(--accent)]">diseñado para tu éxito</span>
              </h2>
              <p className="text-[var(--gray)] text-lg md:text-xl max-w-3xl mx-auto">
                Equipos de última generación, ambiente motivador y todo lo que necesitas para alcanzar tu máximo potencial.
              </p>
            </motion.div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&q=80",
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&q=80",
                "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=400&fit=crop&q=80",
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&q=80",
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&q=80",
                "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=400&fit=crop&q=80"
              ].map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-4 border-transparent hover:border-[var(--accent)]/30"
                >
                  <img 
                    src={image} 
                    alt={`Instalaciones Blackbird House ${index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Sección Entrenadores */}
        <TrainersSection />

        {/* 5. Testimonios */}
        <section id="testimonios" className="py-20 bg-gradient-to-br from-[var(--gray-light)] via-white to-[var(--gray-light)] relative overflow-hidden">
          {/* Elementos decorativos dinámicos */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/3 w-48 h-48 bg-[var(--accent)]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-[var(--accent)]/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
                Ellos ya lo vivieron… <span className="text-[var(--accent)]">ahora es tu turno</span>
              </h2>
            </motion.div>
            
            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {[
                {
                  name: "María L.",
                  photo: "https://images.unsplash.com/photo-1494790108755-2616b612b630?w=150&h=150&fit=crop&crop=face&q=80",
                  quote: "En solo una clase entendí lo que hacía mal y cómo corregirlo. Increíble."
                },
                {
                  name: "Jorge M.",
                  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&q=80",
                  quote: "La atención personalizada me motivó a seguir. Lo recomiendo 100%."
                },
                {
                  name: "Ana P.",
                  photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&q=80",
                  quote: "Blackbird House es otro nivel, no hay comparación."
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:shadow-[var(--accent)]/20 text-center transition-all duration-500 hover:scale-105 border-2 border-transparent hover:border-[var(--accent)]/30"
                >
                  <FaQuoteLeft className="text-[var(--accent)] text-4xl mx-auto mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                  <p className="text-black text-xl mb-8 italic font-medium leading-relaxed group-hover:text-gray-700 transition-colors duration-300">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center justify-center gap-4">
                    <img 
                      src={testimonial.photo} 
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-[var(--accent)]/20 group-hover:border-[var(--accent)]/50 group-hover:scale-110 transition-all duration-500"
                    />
                    <div>
                      <p className="text-black font-bold text-lg group-hover:text-[var(--accent)] transition-colors duration-300">– {testimonial.name}</p>
                      <div className="w-0 group-hover:w-full h-0.5 bg-[var(--accent)] transition-all duration-700 mt-1"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Formulario de registro */}
        <section id="formulario" className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
          {/* Efectos de fondo espectaculares */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--accent)]/10 via-transparent to-transparent"></div>
            <div className="absolute top-20 left-1/4 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-[var(--accent)]/3 rounded-full blur-3xl animate-pulse delay-500"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent)]/2 rounded-full blur-3xl opacity-30"></div>
          </div>
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Reserva tu <span className="text-[var(--accent)]">clase gratuita</span>
              </h2>
              <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
                Completa tus datos y te contactaremos para confirmar tu clase de prueba sin costo.
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

        {/* 7. Cierre y último llamado */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1920&h=1080&fit=crop&q=80" 
              alt="Transformación Blackbird House"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 overlay"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="container mx-auto px-6 text-center relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-[var(--accent)] mb-6">
              Un solo paso puede cambiarlo todo
            </h2>
            <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto">
              Agenda tu clase gratuita y siente la diferencia desde el primer día.
            </p>
            <button 
              onClick={scrollToForm}
              className="cta-button text-lg md:text-xl px-12 py-5"
            >
              Agendar mi clase gratuita ahora
            </button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}