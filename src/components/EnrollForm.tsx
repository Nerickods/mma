'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';

export default function EnrollForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    
    try {
      // Webhook placeholder - reemplazar con URL real de n8n
      const webhookUrl = 'https://your-n8n-webhook-url.com/webhook/blackbird-house';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          timestamp: new Date().toISOString(),
          source: 'Blackbird House Landing'
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
      } else {
        throw new Error('Error en el envío');
      }
    } catch {
      // Fallback: log local para demo
      console.log('Datos del lead capturado:', payload);
      setIsSuccess(true);
    form.reset();
    }
    
    setIsSubmitting(false);
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={false}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 rounded-2xl bg-[var(--accent)] border border-[var(--accent)]"
      >
        <h3 className="text-2xl font-bold text-black mb-4">
          ¡Listo! Te contactaremos en breve para confirmar tu clase.
        </h3>
        <p className="text-black text-lg mb-6">
          Revisa tu email y mantén tu teléfono cerca. Nos comunicaremos contigo en las próximas horas.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="bg-black text-[var(--accent)] px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
        >
          Agendar otra clase
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 gap-6 rounded-2xl bg-black/80 backdrop-blur-sm p-8 border border-[var(--accent)]/30"
    >
      {/* Nombre */}
      <div>
        <label className="flex items-center gap-3 text-sm mb-3 font-medium text-white" htmlFor="nombre">
          <FaUser className="text-[var(--accent)] text-lg" />
          Nombre completo
        </label>
        <input 
          id="nombre" 
          name="nombre" 
          type="text"
          required 
          placeholder="Tu nombre completo" 
          className="w-full rounded-lg bg-white/10 px-4 py-4 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:border-[var(--accent)] focus:bg-white/15 transition-all duration-300 text-lg" 
        />
      </div>

      {/* Email */}
      <div>
        <label className="flex items-center gap-3 text-sm mb-3 font-medium text-white" htmlFor="email">
          <FaEnvelope className="text-[var(--accent)] text-lg" />
          Correo electrónico
        </label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          required 
          placeholder="tu@email.com" 
          className="w-full rounded-lg bg-white/10 px-4 py-4 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:border-[var(--accent)] focus:bg-white/15 transition-all duration-300 text-lg" 
        />
      </div>

      {/* Teléfono */}
      <div>
        <label className="flex items-center gap-3 text-sm mb-3 font-medium text-white" htmlFor="telefono">
          <FaPhone className="text-[var(--accent)] text-lg" />
          Teléfono
        </label>
        <input 
          id="telefono" 
          name="telefono" 
          type="tel" 
          required 
          placeholder="+54 11 1234-5678" 
          className="w-full rounded-lg bg-white/10 px-4 py-4 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:border-[var(--accent)] focus:bg-white/15 transition-all duration-300 text-lg" 
        />
      </div>

      {/* Horario preferido */}
      <div>
        <label className="flex items-center gap-3 text-sm mb-3 font-medium text-white" htmlFor="horario">
          <FaClock className="text-[var(--accent)] text-lg" />
          Horario preferido
        </label>
        <select 
          id="horario" 
          name="horario" 
          required 
          className="w-full rounded-lg bg-white/10 px-4 py-4 text-white border border-white/20 focus:outline-none focus:border-[var(--accent)] focus:bg-white/15 transition-all duration-300 text-lg appearance-none cursor-pointer"
        >
          <option value="" className="bg-black text-white">Selecciona tu horario preferido</option>
          <option value="mañana" className="bg-black text-white">Mañana (9:00 - 12:00)</option>
          <option value="tarde" className="bg-black text-white">Tarde (14:00 - 18:00)</option>
          <option value="noche" className="bg-black text-white">Noche (19:00 - 22:00)</option>
        </select>
      </div>

      {/* Botón de envío */}
      <div className="mt-6">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full cta-button text-xl py-5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enviando...' : '¡Reservar mi clase gratis!'}
        </motion.button>
        
        <p className="text-center text-white/60 text-sm mt-4 leading-relaxed">
          🔒 Tus datos están protegidos • ✅ Sin spam • 🎯 Solo te contactaremos para tu clase gratuita
        </p>
      </div>
    </motion.form>
  );
}