'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Classification {
    topics?: string[]
    intent?: string
    quality?: string
    summary?: string
    flags?: {
        frustration_detected?: boolean
        escalation_needed?: boolean
        bug_reported?: boolean
        resolved?: boolean
    }
}

interface Session {
    id: string
    conversation_id: string
    first_message_at: string
    last_message_at: string
    message_count: number
    user_message_count: number
    assistant_message_count: number
    transcript: string | null
    classification: Classification | null
    classified_at: string | null
    conversation?: {
        visitor_id?: string
    }
}

interface Pagination {
    page: number
    limit: number
    total: number
    totalPages: number
}

// Common topics for filter
const AVAILABLE_TOPICS = ['MMA', 'Entrenamiento', 'Precios', 'Ubicación', 'Horarios']

export default function ConversationsPage() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Filters from URL
    const filterStatus = searchParams.get('status') // 'all', 'classified', 'unclassified'
    const filterTopic = searchParams.get('topic')
    const filterUrgency = searchParams.get('urgency') // 'critical', 'high', 'medium'
    const initialSessionId = searchParams.get('id')

    const [sessions, setSessions] = useState<Session[]>([])
    const [pagination, setPagination] = useState<Pagination | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedSession, setSelectedSession] = useState<Session | null>(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchConversations()
    }, [page, filterStatus, filterTopic, filterUrgency])

    async function fetchConversations() {
        setLoading(true)
        try {
            // Build query params
            const params = new URLSearchParams()
            params.set('page', page.toString())
            params.set('limit', '20')
            if (filterStatus) params.set('status', filterStatus)
            if (filterTopic) params.set('topic', filterTopic)
            if (filterUrgency) params.set('urgency', filterUrgency)

            const res = await fetch(`/api/conversations?${params.toString()}`)
            if (res.ok) {
                const data = await res.json()
                setSessions(data.sessions)
                setPagination(data.pagination)

                // Select initial session if provided & not already selected
                if (initialSessionId && !selectedSession) {
                    const found = data.sessions.find((s: Session) => s.id === initialSessionId)
                    if (found) setSelectedSession(found)
                }
            }
        } catch (error) {
            console.error('Failed to fetch conversations:', error)
        } finally {
            setLoading(false)
        }
    }

    // Helper to update URL filters
    const updateFilter = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        params.delete('id') // Clear selected ID when filtering
        params.set('page', '1') // Reset to page 1
        router.push(`/admin/conversations?${params.toString()}`)
    }

    function formatDate(dateStr: string) {
        return new Date(dateStr).toLocaleString('es-ES', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <div className="p-8 h-screen flex flex-col">
            <div className="mb-6 flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-white">Conversaciones</h1>
                    <p className="text-white/50 mt-1">
                        {pagination?.total || 0} sesiones encontradas
                    </p>
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                    <select
                        value={filterTopic || 'all'}
                        onChange={(e) => updateFilter('topic', e.target.value === 'all' ? null : e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="all">Todos los Temas</option>
                        {AVAILABLE_TOPICS.map(t => (
                            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                        ))}
                    </select>

                    <select
                        value={filterStatus || 'all'}
                        onChange={(e) => updateFilter('status', e.target.value === 'all' ? null : e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="all">Todos los estados</option>
                        <option value="classified">Clasificados</option>
                        <option value="unclassified">Sin clasificar</option>
                    </select>

                    <select
                        value={filterUrgency || 'all'}
                        onChange={(e) => updateFilter('urgency', e.target.value === 'all' ? null : e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="all">Cualquier prioridad</option>
                        <option value="critical">Crítica (Escalación)</option>
                        <option value="high">Alta (Frustración)</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-6 flex-1 overflow-hidden">
                {/* Lista de conversaciones */}
                <div className="w-[400px] flex flex-col bg-zinc-900/50 border border-white/5 rounded-xl overflow-hidden shrink-0">
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            </div>
                        ) : sessions.length === 0 ? (
                            <div className="text-center py-20 text-white/40">
                                No hay conversaciones que coincidan
                            </div>
                        ) : (
                            sessions.map((session) => (
                                <button
                                    key={session.id}
                                    onClick={() => setSelectedSession(session)}
                                    className={`w-full text-left p-4 rounded-lg border transition-all ${selectedSession?.id === session.id
                                        ? 'bg-white/10 border-white/30 shadow-lg'
                                        : 'bg-transparent border-transparent hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            {session.classification ? (
                                                <span
                                                    className={`w-2.5 h-2.5 rounded-full ${session.classification.flags?.escalation_needed
                                                        ? 'bg-red-500 animate-pulse'
                                                        : session.classification.flags?.frustration_detected
                                                            ? 'bg-orange-400'
                                                            : 'bg-green-400'
                                                        }`}
                                                />
                                            ) : (
                                                <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                                            )}
                                            <span className="font-medium text-white text-sm truncate max-w-[120px]">
                                                {session.conversation?.visitor_id || 'Anónimo'}
                                            </span>
                                        </div>
                                        <span className="text-white/40 text-xs whitespace-nowrap">
                                            {formatDate(session.last_message_at)}
                                        </span>
                                    </div>

                                    {session.classification?.summary ? (
                                        <p className="text-white/70 text-xs line-clamp-2 mb-2 leading-relaxed">
                                            {session.classification.summary}
                                        </p>
                                    ) : (
                                        <p className="text-white/40 text-xs italic mb-2">Sin clasificar</p>
                                    )}

                                    <div className="flex gap-2 items-center">
                                        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-white/40 border border-white/5">
                                            {session.message_count} msgs
                                        </span>
                                        {session.classification?.topics?.[0] && (
                                            <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20">
                                                {session.classification.topics[0]}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))
                        )}
                    </div>

                    {/* Simple Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="p-3 border-t border-white/10 flex items-center justify-between bg-zinc-900">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1.5 text-xs bg-white/10 text-white rounded hover:bg-white/20 disabled:opacity-30 transition-colors"
                            >
                                Anterior
                            </button>
                            <span className="text-white/60 text-xs">
                                Pag {page} de {pagination.totalPages}
                            </span>
                            <button
                                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                                disabled={page === pagination.totalPages}
                                className="px-3 py-1.5 text-xs bg-white/10 text-white rounded hover:bg-white/20 disabled:opacity-30 transition-colors"
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </div>

                {/* Detalle de Sesión */}
                <div className="flex-1 bg-zinc-900/50 border border-white/5 rounded-xl overflow-hidden flex flex-col">
                    {selectedSession ? (
                        <>
                            {/* Header Detalle */}
                            <div className="p-6 border-b border-white/10 bg-zinc-900">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-1">
                                            Sesión {selectedSession.id.slice(0, 8)}...
                                        </h2>
                                        <p className="text-white/50 text-sm">
                                            Iniciada el {formatDate(selectedSession.first_message_at)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        {selectedSession.classification?.quality && (
                                            <Badge
                                                label={selectedSession.classification.quality}
                                                color={
                                                    selectedSession.classification.quality === 'high' ? 'green' :
                                                        selectedSession.classification.quality === 'medium' ? 'yellow' : 'red'
                                                }
                                            />
                                        )}
                                        {selectedSession.classification?.flags?.escalation_needed && (
                                            <Badge label="ESCALAR" color="red" />
                                        )}
                                    </div>
                                </div>

                                {selectedSession.classification && (
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                                        <h4 className="text-white/40 text-xs uppercase tracking-wide mb-2">Resumen AI</h4>
                                        <p className="text-white/80 text-sm leading-relaxed mb-3">
                                            {selectedSession.classification.summary}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedSession.classification.topics?.map(t => (
                                                <Badge key={t} label={t} color="blue" />
                                            ))}
                                            <Badge label={`Intent: ${selectedSession.classification.intent}`} color="gray" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Transcript Scrolling Area */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-950/30">
                                {selectedSession.transcript ? (
                                    selectedSession.transcript.split('\n\n').map((msg, i) => {
                                        const isUser = msg.startsWith('USER:')
                                        const content = msg.replace(/^(USER|ASSISTANT):/, '').trim()

                                        return (
                                            <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
                                                    <span className="text-[10px] text-white/30 mb-1 uppercase tracking-wider pl-1">
                                                        {isUser ? 'Usuario' : 'Blackbird AI'}
                                                    </span>
                                                    <div
                                                        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${isUser
                                                            ? 'bg-blue-600 text-white rounded-tr-sm'
                                                            : 'bg-zinc-800 text-white/90 rounded-tl-sm border border-white/5'
                                                            }`}
                                                    >
                                                        {content}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="text-center py-20">
                                        <p className="text-white/40">No hay transcripción disponible</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-white/20 p-8 text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-white/40 mb-2">Selecciona una conversación</h3>
                            <p className="text-sm max-w-xs">Haz clic en cualquier conversación de la izquierda para ver el historial completo y detalles.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function Badge({ label, color }: { label: string, color: 'green' | 'red' | 'yellow' | 'blue' | 'gray' }) {
    const colors = {
        green: 'bg-green-500/20 text-green-300 border-green-500/30',
        red: 'bg-red-500/20 text-red-300 border-red-500/30',
        yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        gray: 'bg-white/10 text-white/60 border-white/10',
    }

    return (
        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${colors[color]}`}>
            {label}
        </span>
    )
}
