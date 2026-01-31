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
        resolved_by?: string
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

    async function markSessionAsRead(sessionId: string) {
        const resolverName = window.prompt('¿Quién resolvió esta situación?', 'Admin')
        if (!resolverName) return; // Cancelled

        // Optimistic update
        const updateState = (s: Session) => ({
            ...s,
            classification: {
                ...s.classification,
                flags: {
                    ...s.classification?.flags,
                    read: true,
                    resolved: true,
                    resolved_by: resolverName
                }
            }
        });

        // Update lists immediately
        setSessions(prev => prev.map(s => s.id === sessionId ? updateState(s) : s));
        if (selectedSession?.id === sessionId) {
            setSelectedSession(prev => prev ? updateState(prev) : null);
        }

        try {
            await fetch(`/api/sessions/${sessionId}/mark-read`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resolvedBy: resolverName })
            })
        } catch (error) {
            console.error('Error marking as read:', error)
            // Revert on error? For now assuming success mostly.
        }
    }

    return (
        <div className="p-8 h-[calc(100vh-2rem)] flex flex-col space-y-6 animate-in fade-in zoom-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-amber-900 dark:text-white tracking-tight flex items-center gap-3">
                        historial
                        de
                        conversaciones
                        <span className="text-sm font-normal text-amber-900/60 dark:text-white/40 px-3 py-1 bg-white/50 dark:bg-white/10 rounded-full border border-white/40 dark:border-white/5 shadow-sm">
                            {pagination?.total || 0} Sesiones
                        </span>
                    </h1>
                </div>

                {/* Filters */}
                <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    <div className="relative group min-w-[150px]">
                        <select
                            value={filterTopic || 'all'}
                            onChange={(e) => updateFilter('topic', e.target.value === 'all' ? null : e.target.value)}
                            className="w-full appearance-none bg-white/80 dark:bg-black/20 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-xl px-4 py-2.5 pr-10 text-sm font-medium focus:bg-white dark:focus:bg-white/10 focus:outline-none transition-all cursor-pointer hover:border-amber-500/50 dark:hover:border-red-500/50"
                        >
                            <option value="all" className="bg-white dark:bg-zinc-900">Todos los Temas</option>
                            {AVAILABLE_TOPICS.map(t => (
                                <option key={t} value={t} className="bg-white dark:bg-zinc-900">{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                            <svg className="w-4 h-4 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>

                    <div className="relative group min-w-[150px]">
                        <select
                            value={filterStatus || 'all'}
                            onChange={(e) => updateFilter('status', e.target.value === 'all' ? null : e.target.value)}
                            className="w-full appearance-none bg-white/80 dark:bg-black/20 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-xl px-4 py-2.5 pr-10 text-sm font-medium focus:bg-white dark:focus:bg-white/10 focus:outline-none transition-all cursor-pointer hover:border-amber-500/50 dark:hover:border-red-500/50"
                        >
                            <option value="all" className="bg-white dark:bg-zinc-900">Todos los estados</option>
                            <option value="classified" className="bg-white dark:bg-zinc-900">Clasificados</option>
                            <option value="unclassified" className="bg-white dark:bg-zinc-900">Sin clasificar</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                            <svg className="w-4 h-4 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>

                    <div className="relative group min-w-[150px]">
                        <select
                            value={filterUrgency || 'all'}
                            onChange={(e) => updateFilter('urgency', e.target.value === 'all' ? null : e.target.value)}
                            className="w-full appearance-none bg-white/80 dark:bg-black/20 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-xl px-4 py-2.5 pr-10 text-sm font-medium focus:bg-white dark:focus:bg-white/10 focus:outline-none transition-all cursor-pointer hover:border-amber-500/50 dark:hover:border-red-500/50"
                        >
                            <option value="all" className="bg-white dark:bg-zinc-900">Cualquier prioridad</option>
                            <option value="critical" className="bg-white dark:bg-zinc-900">Crítica (Escalación)</option>
                            <option value="high" className="bg-white dark:bg-zinc-900">Alta (Frustración)</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                            <svg className="w-4 h-4 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
                {/* LIST View */}
                <div className="w-full lg:w-[400px] flex flex-col bg-white/70 dark:bg-black/20 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-3xl overflow-hidden shrink-0 shadow-2xl shadow-orange-500/10 dark:shadow-black/50 transition-all duration-300">
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="w-8 h-8 border-2 border-orange-200 dark:border-white/20 border-t-orange-600 rounded-full animate-spin" />
                            </div>
                        ) : sessions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                                <div className="w-12 h-12 bg-orange-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 text-orange-500 dark:text-white/20">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                                </div>
                                <p className="text-amber-900/40 dark:text-white/40 text-sm font-medium">No se encontraron conversaciones</p>
                            </div>
                        ) : (
                            sessions.map((session) => (
                                <button
                                    key={session.id}
                                    onClick={() => setSelectedSession(session)}
                                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 group relative overflow-hidden ${selectedSession?.id === session.id
                                        ? 'bg-amber-50 border-amber-200 dark:bg-red-500/5 dark:border-red-500/20 shadow-md ring-1 ring-amber-500/20'
                                        : 'bg-transparent border-transparent hover:bg-white/60 dark:hover:bg-white/5 hover:shadow-sm'
                                        }`}
                                >
                                    {selectedSession?.id === session.id && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-red-600" />
                                    )}

                                    <div className="flex items-start justify-between mb-2 pl-2">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                {session.classification ? (
                                                    <span
                                                        className={`block w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-black ${session.classification.flags?.escalation_needed && !session.classification.flags?.resolved
                                                            ? 'bg-red-500 animate-pulse'
                                                            : session.classification.flags?.frustration_detected && !session.classification.flags?.resolved
                                                                ? 'bg-orange-400'
                                                                : session.classification.flags?.resolved
                                                                    ? 'bg-blue-400'
                                                                    : 'bg-green-400'
                                                            }`}
                                                    />
                                                ) : (
                                                    <span className="block w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                                                )}
                                                {session.classification?.flags?.resolved && (
                                                    <div className="absolute -right-1 -bottom-1 bg-white dark:bg-black rounded-full p-[1px]">
                                                        <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <span className={`block text-sm font-bold truncate max-w-[120px] transition-colors ${selectedSession?.id === session.id
                                                    ? 'text-amber-900 dark:text-white'
                                                    : 'text-amber-900/80 dark:text-white/90'
                                                    } ${session.classification?.flags?.resolved ? 'line-through opacity-70' : ''}`}>
                                                    {session.conversation?.visitor_id || 'Visitante'}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-40 text-amber-900 dark:text-white">
                                            {formatDate(session.last_message_at)}
                                        </span>
                                    </div>

                                    <div className="pl-5">
                                        {session.classification?.summary ? (
                                            <p className="text-xs text-amber-900/70 dark:text-white/60 line-clamp-2 leading-relaxed mb-3 font-medium">
                                                {session.classification.summary}
                                            </p>
                                        ) : (
                                            <p className="text-xs text-amber-900/30 dark:text-white/30 italic mb-3">Sin análisis disponible...</p>
                                        )}

                                        <div className="flex gap-2 items-center">
                                            <span className="text-[10px] bg-white dark:bg-white/10 px-2 py-0.5 rounded text-amber-900/50 dark:text-white/50 font-medium border border-amber-900/5 dark:border-white/5">
                                                {session.message_count} msgs
                                            </span>
                                            {session.classification?.topics?.[0] && (
                                                <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/30">
                                                    {session.classification.topics[0]}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>

                    {/* Pagination Footer */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="p-4 border-t border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-white/10 text-black dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <span className="text-xs font-mono font-medium opacity-50">
                                {page} / {pagination.totalPages}
                            </span>
                            <button
                                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                                disabled={page === pagination.totalPages}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-white/10 text-black dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* DETAIL View */}
                <div className="flex-1 bg-white/70 dark:bg-white/5 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl shadow-orange-500/10 dark:shadow-black/20 relative transition-all duration-300">
                    {/* Background Aurora */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-amber-500/10 to-red-600/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />

                    {selectedSession ? (
                        <>
                            {/* Header Detalle */}
                            <div className="p-6 border-b border-white/20 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] relative z-10 backdrop-blur-md">
                                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 dark:from-white dark:to-zinc-300 flex items-center justify-center shadow-lg text-white dark:text-black font-bold text-lg">
                                            {(selectedSession.conversation?.visitor_id || 'AN').slice(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-amber-900 dark:text-white flex items-center gap-2">
                                                {selectedSession.conversation?.visitor_id || 'Visitante Anónimo'}
                                                {selectedSession.classification?.flags?.resolved && (
                                                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase border border-blue-500/20">
                                                        Resuelto por {selectedSession.classification?.flags?.resolved_by || 'Admin'}
                                                    </span>
                                                )}
                                            </h2>
                                            <p className="text-xs text-amber-900/40 dark:text-white/40 font-medium">
                                                ID: <span className="font-mono">{selectedSession.id}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 items-center">
                                        {selectedSession.classification?.quality && (
                                            <Badge
                                                label={`Calidad: ${selectedSession.classification.quality}`}
                                                color={
                                                    selectedSession.classification.quality === 'high' ? 'green' :
                                                        selectedSession.classification.quality === 'medium' ? 'yellow' : 'red'
                                                }
                                            />
                                        )}
                                        {selectedSession.classification?.flags?.escalation_needed && (
                                            <Badge label="⚠️ ESCALAR" color="red" />
                                        )}

                                        {!selectedSession.classification?.flags?.resolved && (
                                            <button
                                                onClick={() => markSessionAsRead(selectedSession.id)}
                                                className="ml-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider hover:bg-green-500/20 hover:scale-105 active:scale-95 transition-all border border-green-500/20 flex items-center gap-1.5 shadow-sm"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                                Marcar Resuelto
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {selectedSession.classification && (
                                    <div className="bg-white/60 dark:bg-black/40 rounded-2xl p-5 border border-white/40 dark:border-white/5 relative overflow-hidden group shadow-sm">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-red-500" />
                                        <div className="flex items-start gap-4 relative z-10">
                                            <div className="p-2 bg-orange-100 dark:bg-white/10 rounded-lg">
                                                <svg className="w-5 h-5 text-orange-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-[10px] uppercase tracking-widest font-bold text-amber-900/40 dark:text-white/40 mb-1">Análisis Inteligente</h4>
                                                <p className="text-sm text-amber-900/80 dark:text-white/90 leading-relaxed font-medium">
                                                    {selectedSession.classification.summary}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {selectedSession.classification.topics?.map(t => (
                                                        <Badge key={t} label={t} color="blue" />
                                                    ))}
                                                    <Badge label={`Intent: ${selectedSession.classification.intent}`} color="gray" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Transcript Area */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-6 relative z-10 custom-scrollbar bg-white/20 dark:bg-transparent">
                                {selectedSession.transcript ? (
                                    selectedSession.transcript.split('\n\n').map((msg, i) => {
                                        const isUser = msg.startsWith('USER:')
                                        const content = msg.replace(/^(USER|ASSISTANT):/, '').trim()

                                        return (
                                            <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
                                                <div className={`flex flex-col max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                                                    <div className="flex items-end gap-3">
                                                        {!isUser && (
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-red-600 flex items-center justify-center shrink-0 shadow-lg mb-1 border border-white/20">
                                                                <span className="text-[10px] font-bold text-white">BB</span>
                                                            </div>
                                                        )}

                                                        <div
                                                            className={`px-6 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm backdrop-blur-md border transition-all duration-300 ${isUser
                                                                ? 'bg-amber-900 dark:bg-white text-white dark:text-black rounded-tr-sm border-amber-900/10 dark:border-white/20 shadow-amber-900/10'
                                                                : 'bg-white/80 dark:bg-white/10 text-amber-900 dark:text-white rounded-tl-sm border-white/60 dark:border-white/10 shadow-black/5'
                                                                }`}
                                                        >
                                                            {content}
                                                        </div>

                                                        {isUser && (
                                                            <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center shrink-0 mb-1 border border-white/40 shadow-sm">
                                                                <svg className="w-4 h-4 text-amber-900/40 dark:text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className={`text-[10px] mt-1.5 font-medium opacity-0 group-hover:opacity-100 transition-opacity ${isUser ? 'pr-12 text-amber-900/30 dark:text-white/30' : 'pl-12 text-amber-900/30 dark:text-white/30'}`}>
                                                        {isUser ? 'Usuario' : 'Blackbird AI'}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center opacity-30">
                                        <svg className="w-16 h-16 mb-4 text-amber-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                        <p className="text-amber-900 dark:text-white">No Transcription Available</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-red-500/10 backdrop-blur-3xl" />
                            <div className="relative z-10 w-24 h-24 bg-white/50 dark:bg-white/5 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl border border-white/40 dark:border-white/10 animate-float-bg">
                                <svg className="w-10 h-10 text-orange-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-amber-900 dark:text-white mb-2 relative z-10">Inbox Neural</h3>
                            <p className="text-amber-900/50 dark:text-white/40 max-w-sm relative z-10">Selecciona una conversación para visualizar el análisis de sentimiento y métricas en tiempo real.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function Badge({ label, color }: { label: string, color: 'green' | 'red' | 'yellow' | 'blue' | 'gray' }) {
    const colors = {
        green: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
        red: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
        yellow: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
        blue: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
        gray: 'bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 border-black/5 dark:border-white/10',
    }

    return (
        <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-md border ${colors[color]}`}>
            {label}
        </span>
    )
}
