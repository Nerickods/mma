'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaClock, FaStar, FaTrophy } from 'react-icons/fa';

interface ScheduleItem {
  id: string;
  discipline: string;
  day: string;
  time: string;
  duration: string;
  level: string;
  instructor: string;
  classImage: string;
  availableSpots: number;
  maxSpots: number;
  isPopular?: boolean;
  isNew?: boolean;
}

const SCHEDULE_DATA: ScheduleItem[] = [
  // MMA - CLASES PRINCIPALES
  {
    id: 'mma-lun-1',
    discipline: 'MMA',
    day: 'Lunes',
    time: '6:00 PM - 7:00 PM',
    duration: '60 min',
    level: 'Principiantes',
    instructor: 'Héctor',
    classImage: '/images/octagon-training.jpeg',
    availableSpots: 8,
    maxSpots: 20,
    isPopular: true
  },
  {
    id: 'mma-mar-1',
    discipline: 'MMA',
    day: 'Martes',
    time: '5:00 PM - 6:00 PM',
    duration: '60 min',
    level: 'Intermedio',
    instructor: 'Héctor',
    classImage: '/images/octagon-training.jpeg',
    availableSpots: 12,
    maxSpots: 20
  },
  {
    id: 'mma-mie-1',
    discipline: 'MMA',
    day: 'Miércoles',
    time: '5:00 PM - 6:00 PM',
    duration: '60 min',
    level: 'Principiantes',
    instructor: 'Héctor',
    classImage: '/images/octagon-training.jpeg',
    availableSpots: 15,
    maxSpots: 20,
    isNew: true
  },
  {
    id: 'mma-jue-1',
    discipline: 'MMA',
    day: 'Jueves',
    time: '5:00 PM - 6:00 PM',
    duration: '60 min',
    level: 'Intermedio',
    instructor: 'Héctor',
    classImage: '/images/octagon-training.jpeg',
    availableSpots: 10,
    maxSpots: 20
  },
  {
    id: 'mma-vie-1',
    discipline: 'MMA',
    day: 'Viernes',
    time: '5:00 PM - 6:00 PM',
    duration: '60 min',
    level: 'Avanzado',
    instructor: 'Héctor',
    classImage: '/images/octagon-training.jpeg',
    availableSpots: 6,
    maxSpots: 15,
    isPopular: true
  },

  // BJJ - JIU JITSU BRASILEÑO
  {
    id: 'bjj-lun-1',
    discipline: 'BJJ',
    day: 'Lunes',
    time: '7:00 PM - 8:00 PM',
    duration: '60 min',
    level: 'No Gi',
    instructor: 'Jorge',
    classImage: '/images/jiu-jitsu-ground.jpeg',
    availableSpots: 18,
    maxSpots: 25,
    isPopular: true
  },
  {
    id: 'bjj-lun-2',
    discipline: 'BJJ',
    day: 'Lunes',
    time: '8:00 PM - 9:00 PM',
    duration: '60 min',
    level: 'Gi',
    instructor: 'Jorge',
    classImage: '/images/jiu-jitsu-ground.jpeg',
    availableSpots: 20,
    maxSpots: 25
  },
  {
    id: 'bjj-mar-1',
    discipline: 'BJJ',
    day: 'Martes',
    time: '7:00 PM - 8:00 PM',
    duration: '60 min',
    level: 'Principiantes',
    instructor: 'Jorge',
    classImage: '/images/jiu-jitsu-ground.jpeg',
    availableSpots: 8,
    maxSpots: 20,
    isNew: true
  },
  {
    id: 'bjj-mie-1',
    discipline: 'BJJ',
    day: 'Miércoles',
    time: '7:00 PM - 8:00 PM',
    duration: '60 min',
    level: 'No Gi',
    instructor: 'Jorge',
    classImage: '/images/jiu-jitsu-ground.jpeg',
    availableSpots: 16,
    maxSpots: 25
  },
  {
    id: 'bjj-mie-2',
    discipline: 'BJJ',
    day: 'Miércoles',
    time: '8:00 PM - 9:00 PM',
    duration: '60 min',
    level: 'Gi',
    instructor: 'Jorge',
    classImage: '/images/jiu-jitsu-ground.jpeg',
    availableSpots: 22,
    maxSpots: 25
  },
  {
    id: 'bjj-jue-1',
    discipline: 'BJJ',
    day: 'Jueves',
    time: '7:00 PM - 8:00 PM',
    duration: '60 min',
    level: 'Principiantes',
    instructor: 'Jorge',
    classImage: '/images/jiu-jitsu-ground.jpeg',
    availableSpots: 12,
    maxSpots: 20
  },
  {
    id: 'bjj-vie-1',
    discipline: 'BJJ',
    day: 'Viernes',
    time: '7:00 PM - 8:00 PM',
    duration: '60 min',
    level: 'Open Mat',
    instructor: 'Jorge',
    classImage: '/images/team-training.jpeg',
    availableSpots: 25,
    maxSpots: 30
  },

  // MUAY THAI - ARTE DE 8 LIMBAS
  {
    id: 'mt-mar-1',
    discipline: 'Muay Thai',
    day: 'Martes',
    time: '6:00 PM - 7:00 PM',
    duration: '60 min',
    level: 'Principiantes',
    instructor: 'Héctor',
    classImage: '/images/muay-thai-sparring.jpeg',
    availableSpots: 14,
    maxSpots: 22,
    isPopular: true
  },
  {
    id: 'mt-mie-1',
    discipline: 'Muay Thai',
    day: 'Miércoles',
    time: '4:00 PM - 5:00 PM',
    duration: '60 min',
    level: 'Intermedio',
    instructor: 'Héctor',
    classImage: '/images/muay-thai-sparring.jpeg',
    availableSpots: 16,
    maxSpots: 22
  },
  {
    id: 'mt-jue-1',
    discipline: 'Muay Thai',
    day: 'Jueves',
    time: '6:00 PM - 7:00 PM',
    duration: '60 min',
    level: 'Principiantes',
    instructor: 'Héctor',
    classImage: '/images/muay-thai-sparring.jpeg',
    availableSpots: 9,
    maxSpots: 22
  },
  {
    id: 'mt-vie-1',
    discipline: 'Muay Thai',
    day: 'Viernes',
    time: '4:00 PM - 5:00 PM',
    duration: '60 min',
    level: 'Sparring Muay Thai',
    instructor: 'Héctor',
    classImage: '/images/muay-thai-sparring.jpeg',
    availableSpots: 12,
    maxSpots: 18,
    isPopular: true
  },

  // BOXEO - EL ARTE DULCE
  {
    id: 'box-lun-1',
    discipline: 'Boxeo',
    day: 'Lunes',
    time: '8:30 AM - 9:30 AM',
    duration: '60 min',
    level: 'Principiantes',
    instructor: 'César',
    classImage: '/images/boxing-training.jpeg',
    availableSpots: 20,
    maxSpots: 25
  },
  {
    id: 'box-mar-1',
    discipline: 'Boxeo',
    day: 'Martes',
    time: '8:30 AM - 9:30 AM',
    duration: '60 min',
    level: 'Intermedio',
    instructor: 'César',
    classImage: '/images/boxing-training.jpeg',
    availableSpots: 18,
    maxSpots: 25
  },
  {
    id: 'box-jue-1',
    discipline: 'Boxeo',
    day: 'Jueves',
    time: '8:30 AM - 9:30 AM',
    duration: '60 min',
    level: 'Principiantes',
    instructor: 'César',
    classImage: '/images/boxing-training.jpeg',
    availableSpots: 22,
    maxSpots: 25
  },
  {
    id: 'box-vie-1',
    discipline: 'Boxeo',
    day: 'Viernes',
    time: '8:30 AM - 9:30 AM',
    duration: '60 min',
    level: 'Sparring',
    instructor: 'César',
    classImage: '/images/boxing-training.jpeg',
    availableSpots: 15,
    maxSpots: 20,
    isPopular: true
  },
  {
    id: 'box-mar-2',
    discipline: 'Boxeo',
    day: 'Martes',
    time: '7:00 PM - 8:00 PM',
    duration: '60 min',
    level: 'Circuito Boxeo',
    instructor: 'Héctor',
    classImage: '/images/conditioning-class.jpeg',
    availableSpots: 12,
    maxSpots: 20,
    isNew: true
  },
  {
    id: 'box-jue-2',
    discipline: 'Boxeo',
    day: 'Jueves',
    time: '7:00 PM - 8:00 PM',
    duration: '60 min',
    level: 'Circuito Boxeo',
    instructor: 'Héctor',
    classImage: '/images/conditioning-class.jpeg',
    availableSpots: 10,
    maxSpots: 20,
    isNew: true
  }
];

const ScheduleGrid: React.FC = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');

  const DAYS = ['all', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  const filteredSchedule = SCHEDULE_DATA.filter(item => {
    const disciplineMatch = selectedDiscipline === 'all' || item.discipline === selectedDiscipline;
    const dayMatch = selectedDay === 'all' || item.day === selectedDay;
    return disciplineMatch && dayMatch;
  });

  const handleReserveClick = (classId: string, className: string) => {
    console.log(`Reservando clase: ${className} (ID: ${classId})`);
    // Scroll al formulario
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Principiantes': return 'bg-green-500 text-white';
      case 'Intermedio': return 'bg-blue-500 text-white';
      case 'Avanzado': return 'bg-red-500 text-white';
      case 'No Gi':
      case 'Gi':
      case 'Open Mat':
      case 'Sparring Muay Thai':
      case 'Circuito Boxeo':
      case 'Sparring': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getSpotsUrgency = (available: number, max: number) => {
    const percentage = (available / max) * 100;
    if (percentage <= 30) return { text: '¡ÚLTIMOS LUGARES!', color: 'text-red-500' };
    if (percentage <= 50) return { text: 'LIMITADO', color: 'text-yellow-500' };
    return { text: 'DISPONIBLE', color: 'text-green-500' };
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header con Copy Persuasivo */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
            ELIGE TU BATALLA
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto leading-relaxed">
            Tu cuerpo no es límite, es <span className="text-yellow-400 font-bold">punto de partida</span>.
            Elige tu horario ideal y únete a <span className="text-yellow-400 font-bold">500+ guerreros</span> que ya están en el camino.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 text-green-400">
              <FaTrophy className="text-xl" />
              <span className="font-semibold">Todos los niveles</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <FaClock className="text-xl" />
              <span className="font-semibold">Clases diarias</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <FaStar className="text-xl" />
              <span className="font-semibold">Entrenadores expertos</span>
            </div>
          </div>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-4"
        >
          <select
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-6 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            <option value="all">🥋 Todas las Disciplinas</option>
            <option value="MMA">⚔️ MMA</option>
            <option value="BJJ">🥋 BJJ</option>
            <option value="Muay Thai">🦵 Muay Thai</option>
            <option value="Boxeo">🥊 Boxeo</option>
          </select>

          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-6 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            <option value="all">📅 Todos los días</option>
            {DAYS.slice(1).map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </motion.div>

        {/* Grid de Clases */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSchedule.map((item, index) => {
            const urgency = getSpotsUrgency(item.availableSpots, item.maxSpots);
            const isLowAvailability = item.availableSpots <= 8;

            return (
              <motion.div
                key={item.id}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`relative bg-gray-800 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                  isLowAvailability ? 'border-red-500 shadow-red-500/20' : 'border-gray-700'
                } hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-400/10`}
              >
                {/* Imagen de la clase con overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.classImage}
                    alt={`${item.discipline} class`}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback si la imagen no carga
                      e.currentTarget.src = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Badges superior */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className={`${getLevelColor(item.level)} px-3 py-1 rounded-full text-xs font-bold`}>
                      {item.level}
                    </span>
                    {item.isPopular && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                        🔥 POPULAR
                      </span>
                    )}
                    {item.isNew && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        ✨ NUEVO
                      </span>
                    )}
                  </div>

                  {/* Indicador de urgencia */}
                  <div className="absolute top-4 right-4 bg-black/70 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-yellow-400 text-sm" />
                      <span className={`text-sm font-bold ${urgency.color}`}>
                        {item.availableSpots}/{item.maxSpots}
                      </span>
                    </div>
                    <p className={`text-xs font-semibold ${urgency.color} mt-1`}>
                      {urgency.text}
                    </p>
                  </div>
                </div>

                {/* Contenido de la clase */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-400 mb-1">{item.discipline}</h3>
                      <p className="text-gray-400 text-sm">{item.day} • {item.time}</p>
                    </div>
                    <div className="text-right">
                      <FaClock className="text-gray-400 text-sm mb-1" />
                      <p className="text-xs text-gray-400">{item.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold">
                      {item.instructor[0]}
                    </div>
                    <div>
                      <p className="text-white font-semibold">Prof. {item.instructor}</p>
                      <p className="text-gray-400 text-xs">Entrenador Certificado</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleReserveClick(item.id, `${item.discipline} - ${item.day} ${item.time}`)}
                    className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      isLowAvailability
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 animate-pulse'
                        : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600'
                    }`}
                  >
                    {isLowAvailability ? '⚠️ RESERVA AHORA - ÚLTIMOS LUGARES' : '🥋 RESERVAR CLASE GRATUITA'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section Final */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-12 border border-gray-700"
        >
          <h3 className="text-3xl font-bold mb-4 text-yellow-400">
            ¿LISTO PARA LA GUERRA?
          </h3>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Únete a la familia Blackbird House. Tu primera clase es gratuita y sin compromiso.
            Descubre el guerrero que llevas dentro.
          </p>
          <button
            onClick={() => {
              document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="cta-button text-lg px-8 py-4 text-black font-bold hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
          >
            AGENDAR MI CLASE GRATUITA AHORA
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ScheduleGrid;