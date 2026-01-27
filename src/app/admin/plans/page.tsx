'use client';
import { useState, useEffect } from 'react';
import { plansService } from '@/features/plans/services/plansService';
import { Plan } from '@/features/plans/types/plan';
import { toast } from 'sonner';

export default function AdminPlansPage() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState<string | null>(null);

    // Track unsaved changes: key is planId
    const [unsavedChanges, setUnsavedChanges] = useState<Record<string, Partial<Plan>>>({});

    const loadPlans = async () => {
        setLoading(true);
        try {
            const data = await plansService.getAllPlansAdmin();
            setPlans(data);
            setUnsavedChanges({});
        } catch (e) {
            console.error(e);
            alert('Error loading plans');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPlans();
    }, []);

    const handleChange = (id: string, field: keyof Plan, value: any) => {
        setUnsavedChanges(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }));
    };

    const handleFeaturesChange = (id: string, newFeatures: string[]) => {
        setUnsavedChanges(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                features: newFeatures
            }
        }));
    };

    const handleSave = async (id: string) => {
        const changes = unsavedChanges[id];
        if (!changes) return;

        setSavingId(id);
        try {
            await plansService.updatePlan(id, changes);

            // Update local state to reflect saved changes
            setPlans(plans.map(p => p.id === id ? { ...p, ...changes } : p));

            // Clear unsaved changes for this item
            const newUnsaved = { ...unsavedChanges };
            delete newUnsaved[id];
            setUnsavedChanges(newUnsaved);

            alert('Plan actualizado correctamente');
        } catch (e) {
            console.error(e);
            alert('Error al guardar');
        } finally {
            setSavingId(null);
        }
    };

    // Helper to get current value (unsaved or saved)
    const getValue = (plan: Plan, field: keyof Plan) => {
        if (unsavedChanges[plan.id] && field in unsavedChanges[plan.id]) {
            return unsavedChanges[plan.id]![field];
        }
        return plan[field];
    };

    if (loading) return <div className="p-8 text-white">Cargando planes...</div>;

    return (
        <div className="p-8 text-white max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Administrar Planes</h1>

            <div className="grid gap-8">
                {plans.map(plan => {
                    const currentFeatures = (getValue(plan, 'features') as string[]) || [];
                    const hasChanges = !!unsavedChanges[plan.id];

                    return (
                        <div key={plan.id} className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 shadow-lg relative">
                            {/* Header / ID Info */}
                            <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-[var(--accent)]">{plan.name} ({plan.period})</h3>
                                    <p className="text-xs text-zinc-500 font-mono mt-1">ID: {plan.key} | UUID: {plan.id}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">
                                        <label className="text-xs text-zinc-400">Orden:</label>
                                        <input
                                            type="number"
                                            value={Number(getValue(plan, 'displayOrder'))}
                                            onChange={(e) => handleChange(plan.id, 'displayOrder', Number(e.target.value))}
                                            className="bg-transparent w-10 text-center text-sm font-bold focus:outline-none"
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleSave(plan.id)}
                                        disabled={!hasChanges || savingId === plan.id}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${hasChanges
                                                ? 'bg-green-600 hover:bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                                                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {savingId === plan.id ? 'Guardando...' : hasChanges ? 'Guardar Cambios' : 'Sin Cambios'}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Left Column: Core Info */}
                                <div className="lg:col-span-4 space-y-5">
                                    <div className="space-y-4">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1.5">Nombre del Plan</label>
                                            <input
                                                type="text"
                                                value={String(getValue(plan, 'name'))}
                                                onChange={(e) => handleChange(plan.id, 'name', e.target.value)}
                                                className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:border-[var(--accent)] focus:outline-none transition-colors"
                                            />
                                        </div>

                                        {/* Price */}
                                        <div>
                                            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1.5">Precio (MXN)</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-zinc-500">$</span>
                                                <input
                                                    type="number"
                                                    value={Number(getValue(plan, 'price'))}
                                                    onChange={(e) => handleChange(plan.id, 'price', Number(e.target.value))}
                                                    className="w-full bg-black/40 border border-zinc-700 rounded-lg pl-8 pr-4 py-2.5 text-white text-lg font-bold focus:border-[var(--accent)] focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Highlight Text */}
                                        <div>
                                            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1.5">Texto Ahorro / Highlight</label>
                                            <input
                                                type="text"
                                                value={String(getValue(plan, 'savings') || '')}
                                                onChange={(e) => handleChange(plan.id, 'savings', e.target.value)}
                                                placeholder="Ej: Ahorra $200"
                                                className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:border-[var(--accent)] focus:outline-none transition-colors"
                                            />
                                        </div>

                                        {/* Flags */}
                                        <div className="grid grid-cols-2 gap-3 pt-2">
                                            <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${getValue(plan, 'isActive')
                                                    ? 'bg-emerald-950/20 border-emerald-500/50 text-emerald-400'
                                                    : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                                                }`}>
                                                <span className="text-sm font-semibold">Activo</span>
                                                <input
                                                    type="checkbox"
                                                    checked={Boolean(getValue(plan, 'isActive'))}
                                                    onChange={(e) => handleChange(plan.id, 'isActive', e.target.checked)}
                                                    className="accent-emerald-500 w-4 h-4"
                                                />
                                            </label>

                                            <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${getValue(plan, 'isPopular')
                                                    ? 'bg-amber-950/20 border-amber-500/50 text-amber-400'
                                                    : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                                                }`}>
                                                <span className="text-sm font-semibold">Popular</span>
                                                <input
                                                    type="checkbox"
                                                    checked={Boolean(getValue(plan, 'isPopular'))}
                                                    onChange={(e) => handleChange(plan.id, 'isPopular', e.target.checked)}
                                                    className="accent-amber-500 w-4 h-4"
                                                />
                                            </label>

                                            <label className={`col-span-2 flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${getValue(plan, 'highlight')
                                                    ? 'bg-purple-950/20 border-purple-500/50 text-purple-400'
                                                    : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                                                }`}>
                                                <span className="text-sm font-semibold">Resaltado (Highlight Cards)</span>
                                                <input
                                                    type="checkbox"
                                                    checked={Boolean(getValue(plan, 'highlight'))}
                                                    onChange={(e) => handleChange(plan.id, 'highlight', e.target.checked)}
                                                    className="accent-purple-500 w-4 h-4"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Description & Features */}
                                <div className="lg:col-span-8 space-y-5">
                                    {/* Description */}
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1.5">Descripción Corta</label>
                                        <textarea
                                            value={String(getValue(plan, 'description'))}
                                            onChange={(e) => handleChange(plan.id, 'description', e.target.value)}
                                            rows={2}
                                            className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
                                        />
                                    </div>

                                    {/* Features Editor */}
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1.5 flex justify-between">
                                            <span>Beneficios / Features</span>
                                            <span className="text-[10px] opacity-60">Una por línea</span>
                                        </label>
                                        <div className="bg-black/40 border border-zinc-700 rounded-lg p-4 space-y-3">
                                            {currentFeatures.map((feature, idx) => (
                                                <div key={idx} className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={feature}
                                                        onChange={(e) => {
                                                            const newFeatures = [...currentFeatures];
                                                            newFeatures[idx] = e.target.value;
                                                            handleFeaturesChange(plan.id, newFeatures);
                                                        }}
                                                        className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:border-zinc-600 focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            const newFeatures = currentFeatures.filter((_, i) => i !== idx);
                                                            handleFeaturesChange(plan.id, newFeatures);
                                                        }}
                                                        className="px-3 text-zinc-600 hover:text-red-400 transition-colors"
                                                        title="Eliminar beneficio"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => handleFeaturesChange(plan.id, [...currentFeatures, "Nuevo beneficio"])}
                                                className="w-full py-2 border border-dashed border-zinc-700 rounded text-xs text-zinc-500 hover:text-white hover:border-zinc-500 transition-all uppercase tracking-wider"
                                            >
                                                + Agregar Beneficio
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
