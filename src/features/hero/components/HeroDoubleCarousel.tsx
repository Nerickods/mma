import { motion } from 'framer-motion';
import InfiniteCarouselRow from './InfiniteCarouselRow';
import { heroCarouselRows } from '../services/heroData';
import UiverseButton from '@/shared/components/UiverseButton';

export default function HeroDoubleCarousel() {
    const handleCtaClick = () => {
        // Direct implementation to ensure functionality
        const formElement = document.getElementById('formulario');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error('Formulario element not found');
        }
    };

    return (
        <section id="inicio" className="relative w-full min-h-screen bg-[var(--background)] overflow-hidden flex flex-col font-['Poppins']">

            {/* 1. TOP CAROUSEL (Left) - No Overlays */}
            <div className="w-full h-[50vh] relative z-0">
                <InfiniteCarouselRow
                    images={heroCarouselRows[0].images}
                    direction="left"
                    duration={heroCarouselRows[0].animation.duration}
                />
            </div>

            {/* 2. BOTTOM CAROUSEL (Right) - No Overlays */}
            <div className="w-full h-[50vh] relative z-0">
                <InfiniteCarouselRow
                    images={heroCarouselRows[1].images}
                    direction="right"
                    duration={heroCarouselRows[1].animation.duration}
                />
            </div>

            {/* 3. CENTRAL OVERLAY - GLASSMORPHISM BOX */}
            <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center p-4">

                {/* Glassmorphism Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-20 max-w-5xl w-full mx-auto p-8 md:p-16 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.6)]"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50"></div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-white italic tracking-tighter mb-8 uppercase leading-[0.9]"
                    >
                        LA MEJOR ACADEMIA DE <br />
                        <span className="text-[var(--accent)] drop-shadow-[0_0_25px_rgba(255,215,0,0.4)]">
                            MMA EN GUADALAJARA
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-base md:text-xl text-white font-normal max-w-3xl mb-10 leading-relaxed tracking-wide drop-shadow-sm"
                    >
                        Domina el <span className="font-bold text-[var(--accent)]">Jiu-Jitsu, Muay Thai y Boxeo</span>. <br className="hidden md:block" />
                        Transforma tu mentalidad y físico en Blackbird House. <br className="hidden md:block" />
                        <span className="font-bold border-b-2 border-[var(--accent)]">Agenda tu visita gratuita hoy mismo.</span>
                    </motion.p>

                    {/* Compact & Alive CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    >
                        <UiverseButton text="RESERVA VISITA GRATIS" onClick={handleCtaClick} />
                    </motion.div>

                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/30"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white/40 rounded-full animate-scroll"></div>
                </div>
            </motion.div>

        </section>
    );
}
