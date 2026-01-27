'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Analytics {
    overview: {
        totalSessions: number
        totalMessages: number
        classifiedCount: number
        unclassifiedCount: number
        resolutionRate: number
    }
    alerts: {
        frustrationCount: number
        escalationNeeded: number
        bugsReported: number
    }
    qualityDistribution: {
        high: number
        medium: number
        low: number
        spam: number
    }
    topTopics: Array<{ topic: string; count: number; percentage: number }>
    interventionQueue: Array<{
        id: string
        summary: string
        severity: 'critical' | 'high' | 'medium'
        flags: { frustration: boolean; escalation: boolean; bug: boolean }
        hoursAgo: number
    }>
}

export default function AdminDashboard() {
    const [analytics, setAnalytics] = useState<Analytics | null>(null)
    const [loading, setLoading] = useState(true)
    const [classifying, setClassifying] = useState(false)
    const router = useRouter()

    useEffect(() => {
        fetchAnalytics()
    }, [])

    async function fetchAnalytics() {
        try {
            const res = await fetch('/api/analytics')
            if (res.ok) {
                const data = await res.json()
                setAnalytics(data)
            }
        } catch (error) {
            console.error('Failed to fetch analytics:', error)
        } finally {
            setLoading(false)
        }
    }

    async function runClassification() {
        setClassifying(true)
        try {
            const res = await fetch('/api/classify', { method: 'POST' })
            const data = await res.json()
            alert(`Clasificación completada: ${data.sessionsClassified} sesiones clasificadas`)
            fetchAnalytics()
        } catch (error) {
            console.error('Classification failed:', error)
            alert('Error al clasificar')
        } finally {
            setClassifying(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                    <p className="text-white/50 mt-1">Vista general del agente conversacional</p>
                </div>
                <button
                    onClick={runClassification}
                    disabled={classifying}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all disabled:opacity-50"
                >
                    {classifying ? 'Clasificando...' : 'Clasificar Conversaciones'}
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                <StatCard
                    label="Total Sesiones"
                    value={analytics?.overview.totalSessions || 0}
                    icon="chat"
                    href="/admin/conversations"
                />
                <StatCard
                    label="Total Mensajes"
                    value={analytics?.overview.totalMessages || 0}
                    icon="message"
                    href="/admin/conversations"
                />
                <StatCard
                    label="Tasa Resolución"
                    value={`${analytics?.overview.resolutionRate || 0}%`}
                    icon="check"
                    color={
                        (analytics?.overview.resolutionRate || 0) >= 80
                            ? 'green'
                            : (analytics?.overview.resolutionRate || 0) >= 50
                                ? 'yellow'
                                : 'red'
                    }
                    href="#"
                />
                <StatCard
                    label="Sin Clasificar"
                    value={analytics?.overview.unclassifiedCount || 0}
                    icon="pending"
                    color={(analytics?.overview.unclassifiedCount || 0) > 0 ? 'yellow' : 'green'}
                    href="/admin/conversations?status=unclassified"
                />
            </div>

            {/* Alerts */}
            {(analytics?.alerts.escalationNeeded || 0) > 0 ||
                (analytics?.alerts.frustrationCount || 0) > 0 ||
                (analytics?.alerts.bugsReported || 0) > 0 ? (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <h3 className="text-red-400 font-medium mb-2">Alertas Activas</h3>
                    <div className="flex gap-6 text-sm">
                        {(analytics?.alerts.escalationNeeded || 0) > 0 && (
                            <Link href="/admin/conversations?urgency=critical" className="text-red-300 hover:text-red-200 underline decoration-1 underline-offset-4">
                                {analytics?.alerts.escalationNeeded} escalaciones pendientes
                            </Link>
                        )}
                        {(analytics?.alerts.frustrationCount || 0) > 0 && (
                            <Link href="/admin/conversations?urgency=high" className="text-orange-300 hover:text-orange-200 underline decoration-1 underline-offset-4">
                                {analytics?.alerts.frustrationCount} usuarios frustrados
                            </Link>
                        )}
                        {(analytics?.alerts.bugsReported || 0) > 0 && (
                            <span className="text-yellow-300">
                                {analytics?.alerts.bugsReported} bugs reportados
                            </span>
                        )}
                    </div>
                </div>
            ) : null}

            <div className="grid grid-cols-2 gap-8">
                {/* Top Topics */}
                <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                    <h3 className="text-white font-medium mb-4">Top Topics</h3>
                    {analytics?.topTopics.length === 0 ? (
                        <p className="text-white/40 text-sm">No hay datos todavía</p>
                    ) : (
                        <div className="space-y-3">
                            {analytics?.topTopics.map((topic) => (
                                <Link
                                    key={topic.topic}
                                    href={`/admin/conversations?topic=${encodeURIComponent(topic.topic)}`}
                                    className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded -mx-2 transition-colors"
                                >
                                    <span className="text-white/80 group-hover:text-white transition-colors">{topic.topic}</span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-white/40 rounded-full group-hover:bg-white/60 transition-colors"
                                                style={{ width: `${topic.percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-white/50 text-sm w-12 text-right">
                                            {topic.count}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quality Distribution */}
                <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                    <h3 className="text-white font-medium mb-4">Distribución de Calidad</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <QualityBadge
                            label="Alta"
                            count={analytics?.qualityDistribution.high || 0}
                            color="green"
                        />
                        <QualityBadge
                            label="Media"
                            count={analytics?.qualityDistribution.medium || 0}
                            color="yellow"
                        />
                        <QualityBadge
                            label="Baja"
                            count={analytics?.qualityDistribution.low || 0}
                            color="orange"
                        />
                        <QualityBadge
                            label="Spam"
                            count={analytics?.qualityDistribution.spam || 0}
                            color="red"
                        />
                    </div>
                </div>

                {/* Intervention Queue */}
                <div className="col-span-2 bg-white/5 rounded-xl border border-white/10 p-6">
                    <h3 className="text-white font-medium mb-4">Cola de Intervención</h3>
                    {analytics?.interventionQueue.length === 0 ? (
                        <p className="text-white/40 text-sm">No hay conversaciones que requieran intervención</p>
                    ) : (
                        <div className="space-y-3">
                            {analytics?.interventionQueue.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/admin/conversations?id=${item.id}`}
                                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <SeverityBadge severity={item.severity} />
                                        <span className="text-white/80 text-sm group-hover:text-white font-medium">{item.summary}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex gap-2">
                                            {item.flags.frustration && (
                                                <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-300 rounded">
                                                    Frustración
                                                </span>
                                            )}
                                            {item.flags.escalation && (
                                                <span className="text-xs px-2 py-1 bg-red-500/20 text-red-300 rounded">
                                                    Escalación
                                                </span>
                                            )}
                                            {item.flags.bug && (
                                                <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded">
                                                    Bug
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-white/40 text-xs">hace {item.hoursAgo}h</span>
                                        <span className="text-white/40 text-xs transform group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function StatCard({
    label,
    value,
    icon,
    color = 'white',
    href
}: {
    label: string
    value: string | number
    icon: string
    color?: 'white' | 'green' | 'yellow' | 'red'
    href: string
}) {
    const colorClasses = {
        white: 'text-white',
        green: 'text-green-400',
        yellow: 'text-yellow-400',
        red: 'text-red-400',
    }

    return (
        <Link href={href} className="bg-white/5 rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-colors block">
            <p className="text-white/50 text-sm mb-1">{label}</p>
            <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
        </Link>
    )
}

function QualityBadge({
    label,
    count,
    color,
}: {
    label: string
    count: number
    color: 'green' | 'yellow' | 'orange' | 'red'
}) {
    const colorClasses = {
        green: 'bg-green-500/20 text-green-300 border-green-500/30',
        yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        red: 'bg-red-500/20 text-red-300 border-red-500/30',
    }

    return (
        <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
            <p className="text-lg font-bold">{count}</p>
            <p className="text-sm opacity-80">{label}</p>
        </div>
    )
}

function SeverityBadge({ severity }: { severity: 'critical' | 'high' | 'medium' }) {
    const classes = {
        critical: 'bg-red-500 text-white',
        high: 'bg-orange-500 text-white',
        medium: 'bg-yellow-500 text-black',
    }

    return (
        <span className={`text-xs px-2 py-1 rounded font-medium ${classes[severity]}`}>
            {severity.toUpperCase()}
        </span>
    )
}
