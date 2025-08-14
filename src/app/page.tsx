'use client';

import { motion } from 'framer-motion';
import Header from "@/components/Header";
import EnrollForm from "@/components/EnrollForm";
import TrainersSection from "@/components/TrainersSection";
import Footer from "@/components/Footer";
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaUsers, 
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

        {/* 3. Puntos de dolor + solución */}
        <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
          {/* Efectos de fondo dinámicos */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--accent)]/5 via-transparent to-transparent"></div>
            <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--accent)]/3 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-[var(--accent)]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Si te sientes así, esta <span className="text-[var(--accent)]">clase es para ti</span>
              </h2>
            </motion.div>
            
            <div className="grid gap-8 md:grid-cols-3 mb-12">
              {[
                "Sientes que no mejoras por más que entrenas",
                "Pierdes motivación rápidamente",
                "No encuentras un método que realmente funcione"
              ].map((pain, index) => (
            <motion.div 
                  key={index}
              initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group text-center p-8 rounded-2xl bg-black/20 border border-red-500/20 hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-500 hover:scale-105"
                >
                  <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-6 group-hover:animate-bounce" />
                  <p className="text-white text-xl font-medium group-hover:text-red-300 transition-colors duration-300">"{pain}"</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[var(--accent)] via-yellow-400 to-[var(--accent)] rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-2xl shadow-[var(--accent)]/40 hover:shadow-[var(--accent)]/60 hover:scale-105 transition-all duration-500 border-4 border-[var(--accent)]/50"
            >
              <h3 className="text-3xl md:text-4xl font-black text-black mb-8 tracking-tight">💡 LA SOLUCIÓN</h3>
              <p className="text-black text-xl md:text-2xl font-bold leading-relaxed">
                En una sola clase gratuita descubrirás un método probado, recibirás atención personalizada 
                y sentirás la diferencia desde el primer día.
              </p>
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
                  <p className="text-black text-xl mb-8 italic font-medium leading-relaxed group-hover:text-gray-700 transition-colors duration-300">"{testimonial.quote}"</p>
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