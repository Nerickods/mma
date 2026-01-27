'use client';
import { useState, useEffect } from 'react';
import { plansService } from '@/features/plans/services/plansService';
import { Promotion } from '@/features/plans/types/plan';

export default function AdminPromotionsPage() {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [loading, setLoading] = useState(true);
    // Track unsaved changes
    const [unsavedChanges, setUnsavedChanges] = useState<Record<string, Partial<Promotion>>>({});
    const [savingId, setSavingId] = useState<string | null>(null);

    const loadPromos = async () => {
        setLoading(true);
        try {
            const data = await plansService.getPromotions();
            setPromotions(data);
            setUnsavedChanges({});
        } catch (e) {
            console.error(e);
            alert('Error loading promotions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPromos();
    }, []);

    const handleChange = (id: string, field: keyof Promotion, value: any) => {
        setUnsavedChanges(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }));
    };

    const handleSave = async (id: string) => {
        const changes = unsavedChanges[id];
        if (!changes) return;

        setSavingId(id);
        try {
            await plansService.updatePromotion(id, changes);

            // Update local state to reflect saved changes
            setPromotions(prev => prev.map(p => p.id === id ? { ...p, ...changes } : p));

            // Clear unsaved changes
            const newUnsaved = { ...unsavedChanges };
            delete newUnsaved[id];
            setUnsavedChanges(newUnsaved);

            alert('Promoción actualizada correctamente');
        } catch (e) {
            alert('Error updating');
        } finally {
            setSavingId(null);
        }
    };

    // Helper to get current value (unsaved or saved)
    const getValue = (promo: Promotion, field: keyof Promotion) => {
        if (unsavedChanges[promo.id] && field in unsavedChanges[promo.id]) {
            return unsavedChanges[promo.id]![field];
        }
        return promo[field];
    };

    if (loading) return <div className="p-8 text-white">Cargando...</div>;

    return (
        <div className="p-8 text-white max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Administrar Promociones</h1>

            <div className="grid gap-6">
                {promotions.map(promo => {
                    const hasChanges = !!unsavedChanges[promo.id];

                    return (
                        <div key={promo.id} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex flex-col gap-6">
                            <div className="flex justify-between items-start border-b border-white/5 pb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-[var(--accent)]">{promo.title}</h3>
                                    <p className="text-sm text-zinc-500 font-mono">ID: {promo.id}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <span className={`text-sm font-semibold ${getValue(promo, 'isActive') ? 'text-green-400' : 'text-red-400'}`}>
                                            {getValue(promo, 'isActive') ? 'ACTIVA' : 'INACTIVA'}
                                        </span>
                                        <input
                                            type="checkbox"
                                            checked={Boolean(getValue(promo, 'isActive'))}
                                            onChange={(e) => handleChange(promo.id, 'isActive', e.target.checked)}
                                            className="w-5 h-5 accent-[var(--accent)]"
                                        />
                                    </label>
                                    <button
                                        onClick={() => handleSave(promo.id)}
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
                                        value={String(getValue(promo, 'title'))}
                                        onChange={(e) => handleChange(promo.id, 'title', e.target.value)}
                                        className="bg-black/40 border border-zinc-700 rounded px-3 py-2.5 w-full text-white focus:border-[var(--accent)] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-zinc-500 block mb-1 uppercase tracking-wider">Texto Descuento</label>
                                    <input
                                        type="text"
                                        value={String(getValue(promo, 'discount'))}
                                        onChange={(e) => handleChange(promo.id, 'discount', e.target.value)}
                                        className="bg-black/40 border border-zinc-700 rounded px-3 py-2.5 w-full text-white focus:border-[var(--accent)] outline-none font-bold"
                                    />
                                </div>
                                <div className="col-span-full">
                                    <label className="text-xs text-zinc-500 block mb-1 uppercase tracking-wider">Descripción / Subtítulo</label>
                                    <input
                                        type="text"
                                        value={String(getValue(promo, 'description'))}
                                        onChange={(e) => handleChange(promo.id, 'description', e.target.value)}
                                        className="bg-black/40 border border-zinc-700 rounded px-3 py-2.5 w-full text-white focus:border-[var(--accent)] outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
