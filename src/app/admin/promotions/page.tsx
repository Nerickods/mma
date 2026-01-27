'use client';
import { useState, useEffect } from 'react';
import { plansService } from '@/features/plans/services/plansService';
import { Promotion, SectionConfig } from '@/features/plans/types/plan';

export default function AdminPromotionsPage() {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [headerConfig, setHeaderConfig] = useState<SectionConfig | null>(null);
    const [loading, setLoading] = useState(true);

    // Track unsaved changes
    const [unsavedPromos, setUnsavedPromos] = useState<Record<string, Partial<Promotion>>>({});
    const [unsavedHeader, setUnsavedHeader] = useState<Partial<SectionConfig>>({});

    const [savingId, setSavingId] = useState<string | null>(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const [promosData, headerData] = await Promise.all([
                plansService.getAllPromotionsAdmin(),
                plansService.getSectionConfig('promotions_header')
            ]);
            setPromotions(promosData);
            setHeaderConfig(headerData);
            setUnsavedPromos({});
            setUnsavedHeader({});
        } catch (e) {
            console.error(e);
            alert('Error loading data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // --- PROMO HANDLERS ---
    const handlePromoChange = (id: string, field: keyof Promotion, value: any) => {
        setUnsavedPromos(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }));
    };

    const handleSavePromo = async (id: string) => {
        const changes = unsavedPromos[id];
        if (!changes) return;

        setSavingId(id);
        try {
            await plansService.updatePromotion(id, changes);
            setPromotions(prev => prev.map(p => p.id === id ? { ...p, ...changes } : p));
            const newUnsaved = { ...unsavedPromos };
            delete newUnsaved[id];
            setUnsavedPromos(newUnsaved);
            alert('Promoción actualizada');
        } catch (e) {
            alert('Error updating promo');
        } finally {
            setSavingId(null);
        }
    };

    const getPromoValue = (promo: Promotion, field: keyof Promotion) => {
        if (unsavedPromos[promo.id] && field in unsavedPromos[promo.id]) {
            return unsavedPromos[promo.id]![field];
        }
        return promo[field];
    };

    // --- HEADER HANDLERS ---
    const handleHeaderChange = (field: keyof SectionConfig, value: any) => {
        setUnsavedHeader(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveHeader = async () => {
        if (!headerConfig) return;
        setSavingId('header');
        try {
            await plansService.updateSectionConfig('promotions_header', unsavedHeader);
            setHeaderConfig({ ...headerConfig, ...unsavedHeader });
            setUnsavedHeader({});
            alert('Cabecera actualizada');
        } catch (e) {
            alert('Error updating header');
        } finally {
            setSavingId(null);
        }
    };

    const getHeaderValue = (field: keyof SectionConfig) => {
        if (field in unsavedHeader) return unsavedHeader[field];
        return headerConfig ? headerConfig[field] : '';
    };

    if (loading) return <div className="p-8 text-white">Cargando...</div>;

    return (
        <div className="p-8 text-white max-w-6xl mx-auto space-y-12">

            {/* --- SECTION HEADER CONFIG --- */}
            <section className="bg-zinc-900 p-8 rounded-xl border border-[var(--accent)]/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]" />
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Configuración General de la Sección</h2>
                        <p className="text-sm text-zinc-400">Personaliza el título y visibilidad de toda la sección de promociones.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                            <span className={`text-sm font-bold ${getHeaderValue('isActive') ? 'text-green-400' : 'text-zinc-500'}`}>
                                {getHeaderValue('isActive') ? 'SECCIÓN VISIBLE' : 'SECCIÓN OCULTA'}
                            </span>
                            <input
                                type="checkbox"
                                checked={Boolean(getHeaderValue('isActive'))}
                                onChange={(e) => handleHeaderChange('isActive', e.target.checked)}
                                className="w-5 h-5 accent-[var(--accent)]"
                            />
                        </label>
                        <button
                            onClick={handleSaveHeader}
                            disabled={Object.keys(unsavedHeader).length === 0 || savingId === 'header'}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${Object.keys(unsavedHeader).length > 0
                                    ? 'bg-[var(--accent)] hover:brightness-110 text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                }`}
                        >
                            {savingId === 'header' ? 'Guardando...' : 'Guardar Configuración'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-xs text-zinc-500 block mb-1 uppercase tracking-wider">Subtítulo (Pequeño, arriba)</label>
                        <input
                            type="text"
                            value={String(getHeaderValue('title'))}
                            onChange={(e) => handleHeaderChange('title', e.target.value)}
                            placeholder="Ej: OFERTA POR TIEMPO LIMITADO"
                            className="bg-black/40 border border-zinc-700 rounded px-4 py-3 w-full text-white focus:border-[var(--accent)] outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-zinc-500 block mb-1 uppercase tracking-wider">Título Principal (Grande)</label>
                        <input
                            type="text"
                            value={String(getHeaderValue('subtitle'))}
                            onChange={(e) => handleHeaderChange('subtitle', e.target.value)}
                            placeholder="Ej: 2026: Tu Año. Tu Legado."
                            className="bg-black/40 border border-zinc-700 rounded px-4 py-3 w-full text-white font-bold text-lg focus:border-[var(--accent)] outline-none"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-xs text-zinc-500 block mb-1 uppercase tracking-wider">Descripción / Footer (Texto pequeño abajo de la sección)</label>
                        <input
                            type="text"
                            value={String(getHeaderValue('description'))}
                            onChange={(e) => handleHeaderChange('description', e.target.value)}
                            className="bg-black/40 border border-zinc-700 rounded px-4 py-3 w-full text-zinc-300 focus:border-[var(--accent)] outline-none"
                        />
                    </div>
                </div>
            </section>

            {/* --- INDIVIDUAL PROMOTIONS --- */}
            <div>
                <h2 className="text-2xl font-bold mb-6 pl-2 border-l-4 border-zinc-700">Tarjetas de Promoción</h2>
                <div className="grid gap-6">
                    {promotions.map(promo => {
                        const hasChanges = !!unsavedPromos[promo.id];

                        return (
                            <div key={promo.id} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex flex-col gap-6 opacity-90 hover:opacity-100 transition-opacity">
                                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-[var(--accent)]">{promo.title}</h3>
                                        <p className="text-sm text-zinc-500 font-mono">ID: {promo.id} | Orden: {promo.displayOrder}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <span className={`text-sm font-semibold ${getPromoValue(promo, 'isActive') ? 'text-green-400' : 'text-red-400'}`}>
                                                {getPromoValue(promo, 'isActive') ? 'ACTIVA' : 'INACTIVA'}
                                            </span>
                                            <input
                                                type="checkbox"
                                                checked={Boolean(getPromoValue(promo, 'isActive'))}
                                                onChange={(e) => handlePromoChange(promo.id, 'isActive', e.target.checked)}
                                                className="w-5 h-5 accent-[var(--accent)]"
                                            />
                                        </label>
                                        <button
                                            onClick={() => handleSavePromo(promo.id)}
                                            disabled={!hasChanges || savingId === promo.id}
                                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${hasChanges
                                                    ? 'bg-green-600 hover:bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                                                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                                }`}
                                        >
                                            {savingId === promo.id ? 'Guardando...' : hasChanges ? 'Guardar Cambios' : 'Sin Cambios'}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs text-zinc-500 block mb-1 uppercase tracking-wider">Título Promo</label>
                                        <input
                                            type="text"
                                            value={String(getPromoValue(promo, 'title'))}
                                            onChange={(e) => handlePromoChange(promo.id, 'title', e.target.value)}
                                            className="bg-black/40 border border-zinc-700 rounded px-3 py-2.5 w-full text-white focus:border-[var(--accent)] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-zinc-500 block mb-1 uppercase tracking-wider">Texto Descuento</label>
                                        <input
                                            type="text"
                                            value={String(getPromoValue(promo, 'discount'))}
                                            onChange={(e) => handlePromoChange(promo.id, 'discount', e.target.value)}
                                            className="bg-black/40 border border-zinc-700 rounded px-3 py-2.5 w-full text-white focus:border-[var(--accent)] outline-none font-bold"
                                        />
                                    </div>
                                    <div className="col-span-full">
                                        <label className="text-xs text-zinc-500 block mb-1 uppercase tracking-wider">Descripción / Subtítulo</label>
                                        <input
                                            type="text"
                                            value={String(getPromoValue(promo, 'description'))}
                                            onChange={(e) => handlePromoChange(promo.id, 'description', e.target.value)}
                                            className="bg-black/40 border border-zinc-700 rounded px-3 py-2.5 w-full text-white focus:border-[var(--accent)] outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
