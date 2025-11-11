'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaPlus, FaMinus } from 'react-icons/fa';

interface QAItem {
  question: string;
  answer: string;
  category: 'beginner' | 'training' | 'results' | 'logistics';
}

const qaData: QAItem[] = [
  {
    question: "¿Realmente puedo empezar sin CERO experiencia?",
    answer: "El 89% de nuestros campeones comenzaron sin saber ni ponerse un guante. ¿Conoces la diferencia entre ellos y tú? Ellos dieron el primer paso. Tú estás a una decisión de convertirte en leyenda.",
    category: 'beginner'
  },
  {
    question: "¿Me van a herir o humillar en mi primera clase?",
    answer: "Humillar a principiantes es para gimnasios de mediocres. Aquí forjamos guerreros, no egos frágiles. Tu primera clase es 100% controlada y adaptada a tu nivel. Nadie te pondrá un dedo encima sin tu permiso.",
    category: 'beginner'
  },
  {
    question: "¿En cuánto tiempo veo resultados REALES?",
    answer: "En 30 días: más confianza que en toda tu vida. En 60 días: técnica superior al 90% de personas que entrenan desde hace años. En 90 días: enemies temen toparse contigo. Los números no mienten, nuestros 473 transformaciones tampoco.",
    category: 'results'
  },
  {
    question: "¿Y si soy demasiado viejo/joven/débil/gordo?",
    answer: "Edad es número, fuerza se entrena, peso se controla. Lo único que importa es tu HAMBRE de victoria. Tenemos campeones de 18 a 65 años, de 45 a 120kg. El único requisito real: estar vivo y dispuesto a sangrar por tus metas.",
    category: 'beginner'
  },
  {
    question: "¿Cuál es la diferencia entre Blackbird y otros gimnasios?",
    answer: "Ellos venden 'ejercicio'. Nosotros creamos guerreros. Ellos tienen instructores con certificados online. Nosotros tenemos campeones con cicatrices reales. Ellos prometen 'bajar de peso'. Nosotros garantizamos transformación o te devolvemos tu sudor.",
    category: 'training'
  },
  {
    question: "¿Realmente me defenderé en una situación real?",
    answer: "No solo te defenderás. Convertirás miedo en adrenalina y pánico en precisión. Nuestro entrenamiento está diseñado para reacciones letales bajo estrés extremo. Cuando otros congelen, tú actuarás.",
    category: 'results'
  },
  {
    question: "¿Qué necesito para mi primera clase?",
    answer: "Solo tres cosas: 1) Ropa cómoda que puedas ensuciar. 2) Agua para no morir en el intento. 3) Cojones para empezar tu transformación. Todo lo demás lo ponemos nosotros. Gratis.",
    category: 'logistics'
  },
  {
    question: "¿Y si descubro que soy el peor del gimnasio?",
    answer: "El campeón más brutal del mundo fue alguna vez el principiante más torpe. La diferencia: él aceptó su nivel bajo y trabajó hasta dominar. Cada leyenda tiene un día cero. Hoy podría ser el tuyo.",
    category: 'beginner'
  },
  {
    question: "¿Me sirve para competir profesionalmente?",
    answer: "Si tienes el talento y los cojones para competir, te prepararemos para dominar. Hemos producido 12 campeones amateurs y 4 profesionales en los últimos 3 años. Pero advertimos: el camino del luchador profesional es para los que aman el dolor más que la comodidad.",
    category: 'training'
  },
  {
    question: "¿Qué pasa si no puedo pagar la membresía completa?",
    answer: "Los guerreros encuentran soluciones, las víctimas encuentran excusas. Tenemos planes económicos, descuentos por compromiso, y oportunidades de trabajo para los más dedicados. Si de verdad quieres esto, encontraremos la forma. El dinero nunca es obstáculo para los determinados.",
    category: 'logistics'
  }
];

const categoryColors = {
  beginner: 'bg-green-500/20 border-green-500/50 text-green-400',
  training: 'bg-orange-500/20 border-orange-500/50 text-orange-400',
  results: 'bg-red-500/20 border-red-500/50 text-red-400',
  logistics: 'bg-blue-500/20 border-blue-500/50 text-blue-400'
};

const categoryLabels = {
  beginner: 'PRINCIPIANTE',
  training: 'ENTRENAMIENTO',
  results: 'RESULTADOS',
  logistics: 'PRÁCTICO'
};

export default function FAQSection() {
  const [expandedItems, setExpandedItems] = useState<number>([]);
  const [filter, setFilter] = useState<string>('all');

  const filteredQA = filter === 'all'
    ? qaData
    : qaData.filter(item => item.category === filter);

  const toggleItem = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-16 bg-gradient-to-br from-black via-gray-900 to-black relative">
      {/* Fondo con efecto de combate */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--accent)]/5 via-transparent to-transparent"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-red-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header brutal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-full px-6 py-3 mb-8">
            <FaQuestionCircle className="text-[var(--accent)] text-xl" />
            <span className="text-[var(--accent)] font-bold tracking-wide">DUDAS DE GUERREROS</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Preguntas que <span className="text-[var(--accent)]">separan campeones</span> de víctimas
          </h2>
          <p className="text-white/70 text-xl max-w-4xl mx-auto leading-relaxed">
            Los valientes preguntan. Los cobardes se quedan con dudas.
            <span className="text-[var(--accent)] font-black"> Elige tu bando.</span>
          </p>
        </motion.div>

        {/* Filtros de categoría */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {[
            { key: 'all', label: 'TODAS', color: 'bg-[var(--accent)] text-black' },
            { key: 'beginner', label: 'PRINCIPIANTES', color: 'bg-green-500/20 text-green-400 border border-green-500/50' },
            { key: 'training', label: 'ENTRENAMIENTO', color: 'bg-orange-500/20 text-orange-400 border border-orange-500/50' },
            { key: 'results', label: 'RESULTADOS', color: 'bg-red-500/20 text-red-400 border border-red-500/50' },
            { key: 'logistics', label: 'PRÁCTICO', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/50' }
          ].map(({ key, label, color }) => (
            <motion.button
              key={key}
              onClick={() => setFilter(key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === key ? color : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid de preguntas y respuestas */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredQA.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 hover:border-[var(--accent)]/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[var(--accent)]/20">

                {/* Categoría */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-black border ${categoryColors[item.category]}`}>
                    {categoryLabels[item.category]}
                  </span>

                  <motion.button
                    onClick={() => toggleItem(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-colors duration-300"
                  >
                    {expandedItems.includes(index) ?
                      <FaMinus className="text-sm" /> :
                      <FaPlus className="text-sm" />
                    }
                  </motion.button>
                </div>

                {/* Pregunta */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-[var(--accent)] transition-colors duration-300 leading-tight">
                  {item.question}
                </h3>

                {/* Respuesta expandible */}
                <AnimatePresence>
                  {expandedItems.includes(index) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-700/50">
                        <p className="text-white/90 text-lg leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Línea decorativa */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                  className="w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent mt-4 origin-center"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA final agresivo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
              ¿Quedas con <span className="text-[var(--accent)]">más dudas</span> o más hambre?
            </h3>
            <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Las respuestas las encuentras en el ring. Las excusas las dejas en la puerta.
              Tu clase gratuita te da todas las respuestas que necesitas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cta-button text-xl px-12 py-5"
              >
                RESERVAR MI BATALLA
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-xl border-2 border-gray-600 hover:bg-gray-700 transition-all duration-300"
              >
                WhatsApp: 33-XXXX-XXXX
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}