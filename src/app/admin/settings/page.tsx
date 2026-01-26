'use client'

import { useEffect, useState } from 'react'

interface Agent {
    id: string
    name: string
    description: string | null
    system_prompt: string
    model_id: string
    temperature: number
    max_tokens: number
    classification_topics: string[]
    is_active: boolean
}

const AVAILABLE_MODELS = [
    { id: 'google/gemini-2.0-flash-001', name: 'Gemini 2.0 Flash (Recomendado)' },
    { id: 'google/gemini-2.0-flash-thinking-exp-01-21', name: 'Gemini 2.0 Flash Thinking' },
    { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
    { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku' },
    { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini' },
    { id: 'openai/gpt-4o', name: 'GPT-4o' },
]

export default function SettingsPage() {
    const [agent, setAgent] = useState<Agent | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
    const [newTopic, setNewTopic] = useState('')

    useEffect(() => {
        fetchAgent()
    }, [])

    async function fetchAgent() {
        try {
            const res = await fetch('/api/agent')
            if (res.ok) {
                const data = await res.json()
                setAgent(data)
            }
        } catch (error) {
            console.error('Failed to fetch agent:', error)
        } finally {
            setLoading(false)
        }
    }

    async function saveAgent() {
        if (!agent) return

        setSaving(true)
        setMessage(null)

        try {
            const res = await fetch('/api/agent', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: agent.name,
                    description: agent.description,
                    system_prompt: agent.system_prompt,
                    model_id: agent.model_id,
                    temperature: agent.temperature,
                    max_tokens: agent.max_tokens,
                    classification_topics: agent.classification_topics,
                }),
            })

            if (res.ok) {
                setMessage({ type: 'success', text: 'Configuración guardada correctamente' })
            } else {
                setMessage({ type: 'error', text: 'Error al guardar la configuración' })
            }
        } catch {
            setMessage({ type: 'error', text: 'Error de conexión' })
        } finally {
            setSaving(false)
        }
    }

    function addTopic() {
        if (!agent || !newTopic.trim()) return
        if (agent.classification_topics.includes(newTopic.trim())) return

        setAgent({
            ...agent,
            classification_topics: [...agent.classification_topics, newTopic.trim()],
        })
        setNewTopic('')
    }

    function removeTopic(topic: string) {
        if (!agent) return
        setAgent({
            ...agent,
            classification_topics: agent.classification_topics.filter((t) => t !== topic),
        })
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        )
    }

    if (!agent) {
        return (
            <div className="p-8">
                <p className="text-white/60">No se encontró un agente activo</p>
            </div>
        )
    }

    return (
        <div className="p-8 max-w-3xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Configuración del Agente</h1>
                <p className="text-white/50 mt-1">Personaliza el comportamiento del asistente</p>
            </div>

            {message && (
                <div
                    className={`mb-6 p-4 rounded-lg border ${message.type === 'success'
                            ? 'bg-green-500/10 border-green-500/30 text-green-300'
                            : 'bg-red-500/10 border-red-500/30 text-red-300'
                        }`}
                >
                    {message.text}
                </div>
            )}

            <div className="space-y-6">
                {/* Nombre */}
                <div>
                    <label className="block text-white/70 text-sm mb-2">Nombre del Agente</label>
                    <input
                        type="text"
                        value={agent.name}
                        onChange={(e) => setAgent({ ...agent, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                    />
                </div>

                {/* Descripción */}
                <div>
                    <label className="block text-white/70 text-sm mb-2">Descripción (opcional)</label>
                    <input
                        type="text"
                        value={agent.description || ''}
                        onChange={(e) => setAgent({ ...agent, description: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                        placeholder="Breve descripción del propósito del agente"
                    />
                </div>

                {/* System Prompt */}
                <div>
                    <label className="block text-white/70 text-sm mb-2">System Prompt</label>
                    <textarea
                        value={agent.system_prompt}
                        onChange={(e) => setAgent({ ...agent, system_prompt: e.target.value })}
                        rows={8}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 resize-none font-mono text-sm"
                        placeholder="Instrucciones para el comportamiento del agente..."
                    />
                    <p className="text-white/40 text-xs mt-2">
                        Define la personalidad, tono y conocimientos del agente
                    </p>
                </div>

                {/* Modelo */}
                <div>
                    <label className="block text-white/70 text-sm mb-2">Modelo de IA</label>
                    <select
                        value={agent.model_id}
                        onChange={(e) => setAgent({ ...agent, model_id: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30"
                    >
                        {AVAILABLE_MODELS.map((model) => (
                            <option key={model.id} value={model.id} className="bg-neutral-900">
                                {model.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Parámetros */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-white/70 text-sm mb-2">
                            Temperatura ({agent.temperature})
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={agent.temperature}
                            onChange={(e) =>
                                setAgent({ ...agent, temperature: parseFloat(e.target.value) })
                            }
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-white/40 mt-1">
                            <span>Preciso</span>
                            <span>Creativo</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white/70 text-sm mb-2">Max Tokens</label>
                        <input
                            type="number"
                            value={agent.max_tokens}
                            onChange={(e) =>
                                setAgent({ ...agent, max_tokens: parseInt(e.target.value) || 500 })
                            }
                            min="100"
                            max="4000"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30"
                        />
                    </div>
                </div>

                {/* Topics de clasificación */}
                <div>
                    <label className="block text-white/70 text-sm mb-2">
                        Topics de Clasificación
                    </label>
                    <div className="flex gap-2 flex-wrap mb-3">
                        {agent.classification_topics.map((topic) => (
                            <span
                                key={topic}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm"
                            >
                                {topic}
                                <button
                                    onClick={() => removeTopic(topic)}
                                    className="ml-1 text-white/40 hover:text-white"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newTopic}
                            onChange={(e) => setNewTopic(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addTopic()}
                            placeholder="Nuevo topic..."
                            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 text-sm"
                        />
                        <button
                            onClick={addTopic}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
                        >
                            Agregar
                        </button>
                    </div>
                    <p className="text-white/40 text-xs mt-2">
                        Estos topics se usarán para clasificar las conversaciones automáticamente
                    </p>
                </div>

                {/* Guardar */}
                <div className="pt-4 border-t border-white/10">
                    <button
                        onClick={saveAgent}
                        disabled={saving}
                        className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all disabled:opacity-50 font-medium"
                    >
                        {saving ? 'Guardando...' : 'Guardar Configuración'}
                    </button>
                </div>
            </div>
        </div>
    )
}
