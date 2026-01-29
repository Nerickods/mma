'use client';

import Link from 'next/link';
import { FaUserPlus, FaArrowRight } from 'react-icons/fa';

interface NewRegistrationsProps {
    count: number;
}

export default function NewRegistrations({ count }: NewRegistrationsProps) {
    if (count === 0) return null;

    return (
        <div className="p-1 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 animate-pulse-slow mb-6">
            <div className="bg-white dark:bg-black rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                        <FaUserPlus className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-black dark:text-white">
                            {count} Nuevas Solicitudes
                        </h3>
                        <p className="text-sm text-black/60 dark:text-white/60">
                            Usuarios esperando contacto para su clase de prueba.
                        </p>
                    </div>
                </div>

                <Link
                    href="/admin/enrollments"
                    className="flex items-center gap-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:scale-105 transition-transform"
                >
                    Ver Solicitudes <FaArrowRight />
                </Link>
            </div>
        </div>
    );
}
