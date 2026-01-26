'use client'

import { useEffect, useState } from 'react'

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
}

interface Pagination {
    page: number
    limit: number
    total: number
    totalPages: number
}

export default function ConversationsPage() {
    const [sessions, setSessions] = useState<Session[]>([])
    const [pagination, setPagination] = useState<Pagination | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedSession, setSelectedSession] = useState<Session | null>(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchConversations()
    }, [page])

    async function fetchConversations() {
        setLoading(true)
        try {
            const res = await fetch(`/api/conversations?page=${page}&limit=20`)
            if (res.ok) {
                const data = await res.json()
                setSessions(data.sessions)
                setPagination(data.pagination)
            }
        } catch (error) {
            console.error('Failed to fetch conversations:', error)
        } finally {
            setLoading(false)
        }
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
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Conversaciones</h1>
                <p className="text-white/50 mt-1">
                    {pagination?.total || 0} sesiones totales
                </p>
            </div>

            <div className="flex gap-8">
                {/* Lista de conversaciones */}
                <div className="flex-1">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        </div>
                    ) : sessions.length === 0 ? (
                        <div className="text-center py-20 text-white/40">
                            No hay conversaciones todavía
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {sessions.map((session) => (
                                <button
                                    key={session.id}
                                    onClick={() => setSelectedSession(session)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all ${selectedSession?.id === session.id
                                            ? 'bg-white/10 border-white/30'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            {session.classification ? (
                                                <span
                                                    className={`w-2 h-2 rounded-full ${session.classification.flags?.resolved
                                                            ? 'bg-green-400'
                                                            : session.classification.flags?.frustration_detected
                                                                ? 'bg-orange-400'
                                                                : 'bg-white/40'
                                                        }`}
                                                />
                                            ) : (
                                                <span className="w-2 h-2 rounded-full bg-white/20" />
                                            )}
                                            <span className="text-white/80 text-sm">
                                                {session.message_count} mensajes
                                            </span>
                                        </div>
                                        <span className="text-white/40 text-xs">
                                            {formatDate(session.first_message_at)}
                                        </span>
                                    </div>

                                    {session.classification?.summary ? (
                                        <p className="text-white/60 text-sm line-clamp-2">
                                            {session.classification.summary}
                                        </p>
                                    ) : (
                                        <p className="text-white/40 text-sm italic">Sin clasificar</p>
                                    )}

                                    {session.classification?.topics && (
                                        <div className="flex gap-2 mt-2 flex-wrap">
                                            {session.classification.topics.map((topic) => (
                                                <span
                                                    key={topic}
                                                    className="text-xs px-2 py-0.5 bg-white/10 text-white/60 rounded"
                                                >
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-6">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1 text-sm bg-white/10 text-white rounded disabled:opacity-30"
                            >
                                Anterior
                            </button>
                            <span className="text-white/60 text-sm">
                                {page} / {pagination.totalPages}
                            </span>
                            <button
                                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                                disabled={page === pagination.totalPages}
                                className="px-3 py-1 text-sm bg-white/10 text-white rounded disabled:opacity-30"
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </div>

                {/* Panel de detalle */}
                <div className="w-[500px]">
                    {selectedSession ? (
                        <div className="bg-white/5 rounded-xl border border-white/10 h-[calc(100vh-200px)] flex flex-col">
                            {/* Header */}
                            <div className="p-4 border-b border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-white font-medium">Detalle de Sesión</h3>
                                    <button
                                        onClick={() => setSelectedSession(null)}
                                        className="text-white/40 hover:text-white"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {selectedSession.classification && (
                                    <div className="space-y-2">
                                        <div className="flex gap-2 flex-wrap">
                                            <span
                                                className={`text-xs px-2 py-1 rounded ${selectedSession.classification.quality === 'high'
                                                        ? 'bg-green-500/20 text-green-300'
                                                        : selectedSession.classification.quality === 'medium'
                                                            ? 'bg-yellow-500/20 text-yellow-300'
                                                            : selectedSession.classification.quality === 'low'
                                                                ? 'bg-orange-500/20 text-orange-300'
                                                                : 'bg-red-500/20 text-red-300'
                                                    }`}
                                            >
                                                Calidad: {selectedSession.classification.quality}
                                            </span>
                                            <span className="text-xs px-2 py-1 bg-white/10 text-white/60 rounded">
                                                Intent: {selectedSession.classification.intent}
                                            </span>
                                            {selectedSession.classification.flags?.resolved && (
                                                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded">
                                                    Resuelto
                                                </span>
                                            )}
                                            {selectedSession.classification.flags?.frustration_detected && (
                                                <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-300 rounded">
                                                    Frustración
                                                </span>
                                            )}
                                            {selectedSession.classification.flags?.escalation_needed && (
                                                <span className="text-xs px-2 py-1 bg-red-500/20 text-red-300 rounded">
                                                    Escalación
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-white/60 text-sm">
                                            {selectedSession.classification.summary}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Transcript */}
                            <div className="flex-1 overflow-y-auto p-4">
                                <h4 className="text-white/50 text-xs uppercase tracking-wide mb-4">
                                    Transcript
                                </h4>
                                {selectedSession.transcript ? (
                                    <div className="space-y-4">
                                        {selectedSession.transcript.split('\n\n').map((msg, i) => {
                                            const isUser = msg.startsWith('USER:')
                                            const content = msg.replace(/^(USER|ASSISTANT):/, '').trim()

                                            return (
                                                <div
                                                    key={i}
                                                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div
                                                        className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${isUser
                                                                ? 'bg-white/10 text-white'
                                                                : 'bg-white/5 text-white/80'
                                                            }`}
                                                    >
                                                        {content}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-white/40 text-sm">No hay transcript disponible</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white/5 rounded-xl border border-white/10 h-[calc(100vh-200px)] flex items-center justify-center">
                            <p className="text-white/40 text-sm">
                                Selecciona una conversación para ver el detalle
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
