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
    painPoints: Array<{
        topic: string
        sessionCount: number
        frustrationRate: number
        unresolvedRate: number
        highQualityRate: number
        avgMessagesPerSession: number
    }>
    contentGaps: Array<{
        topic: string
        sessionCount: number
        frustrationRate: number
        resolutionRate: number
        gapScore: number
        recommendation: 'urgent' | 'recommended' | 'monitor' | 'ok'
    }>
    interventionQueue: Array<{
        id: string
        summary: string
        severity: 'critical' | 'high' | 'medium'
        flags: { frustration: boolean; escalation: boolean; bug: boolean }
        hoursAgo: number
    }>
}

export default function AnalyticsPage() {
    const [analytics, setAnalytics] = useState<Analytics | null>(null)
    const [loading, setLoading] = useState(true)
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        )
    }

    if (!analytics) {
        return (
            <div className="p-8 text-white/60">Error al cargar analíticas</div>
        )
    }

    const totalQuality =
        analytics.qualityDistribution.high +
        analytics.qualityDistribution.medium +
        analytics.qualityDistribution.low +
        analytics.qualityDistribution.spam

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Analíticas Detalladas</h1>
                <p className="text-white/50 mt-1">Métricas profundas del comportamiento del agente</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-5 gap-4 mb-8">
                <StatCard label="Sesiones" value={analytics.overview.totalSessions} href="/admin/conversations" />
                <StatCard label="Mensajes" value={analytics.overview.totalMessages} href="/admin/conversations" />
                <StatCard label="Clasificados" value={analytics.overview.classifiedCount} href="/admin/conversations?status=classified" />

                <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                    <p className="text-white/50 text-xs uppercase tracking-wide">Tasa Resolución</p>
                    <p className={`text-2xl font-bold mt-1 ${analytics.overview.resolutionRate >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {analytics.overview.resolutionRate}%
                    </p>
                </div>

                <Link
                    href="/admin/conversations?status=unclassified"
                    className="bg-white/5 rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-colors cursor-pointer block"
                >
                    <p className="text-white/50 text-xs uppercase tracking-wide">Pendientes</p>
                    <p className={`text-2xl font-bold mt-1 ${analytics.overview.unclassifiedCount > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {analytics.overview.unclassifiedCount}
                    </p>
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Quality Distribution */}
                <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                    <h3 className="text-white font-medium mb-6">Distribución de Calidad</h3>
                    {totalQuality === 0 ? (
                        <p className="text-white/40 text-sm">No hay datos todavía</p>
                    ) : (
                        <>
                            <div className="flex items-center justify-center mb-6">
                                <div className="relative w-40 h-40">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="12" className="text-white/10" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">{totalQuality}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <QualityRow label="Alta" count={analytics.qualityDistribution.high} color="green" />
                                <QualityRow label="Media" count={analytics.qualityDistribution.medium} color="yellow" />
                                <QualityRow label="Baja" count={analytics.qualityDistribution.low} color="orange" />
                                <QualityRow label="Spam" count={analytics.qualityDistribution.spam} color="red" />
                            </div>
                        </>
                    )}
                </div>

                {/* Topics Chart */}
                <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                    <h3 className="text-white font-medium mb-6">Distribución de Topics</h3>
                    {analytics.topTopics.length === 0 ? (
                        <p className="text-white/40 text-sm">No hay datos todavía</p>
                    ) : (
                        <div className="space-y-4">
                            {analytics.topTopics.map((topic, i) => (
                                <Link
                                    key={topic.topic}
                                    href={`/admin/conversations?topic=${encodeURIComponent(topic.topic)}`}
                                    className="block group cursor-pointer"
                                >
                                    <div className="flex justify-between text-sm mb-1 group-hover:text-white transition-colors">
                                        <span className="text-white/80">{topic.topic}</span>
                                        <span className="text-white/50">{topic.count} ({topic.percentage}%)</span>
                                    </div>
                                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                                            style={{
                                                width: `${topic.percentage}%`,
                                                backgroundColor: `hsl(${220 - i * 30}, 70%, 60%)`,
                                            }}
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Pain Points Table */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-6 mb-8">
                <h3 className="text-white font-medium mb-4">Pain Points por Topic</h3>
                {analytics.painPoints.length === 0 ? (
                    <p className="text-white/40 text-sm">No hay datos todavía</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-white/50 text-xs uppercase tracking-wide border-b border-white/10">
                                    <th className="pb-3 pr-4">Topic</th>
                                    <th className="pb-3 pr-4">Sesiones</th>
                                    <th className="pb-3 pr-4">Frustración</th>
                                    <th className="pb-3 pr-4">Sin Resolver</th>
                                    <th className="pb-3">Msgs/Sesión</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics.painPoints.map((pp) => (
                                    <tr
                                        key={pp.topic}
                                        className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                                        onClick={() => router.push(`/admin/conversations?topic=${encodeURIComponent(pp.topic)}`)}
                                    >
                                        <td className="py-3 pr-4 text-white/80">{pp.topic}</td>
                                        <td className="py-3 pr-4 text-white/60">{pp.sessionCount}</td>
                                        <td className="py-3 pr-4"><span className={pp.frustrationRate >= 25 ? 'text-red-400' : 'text-green-400'}>{pp.frustrationRate}%</span></td>
                                        <td className="py-3 pr-4"><span className={pp.unresolvedRate >= 25 ? 'text-yellow-400' : 'text-green-400'}>{pp.unresolvedRate}%</span></td>
                                        <td className="py-3 text-white/60">{pp.avgMessagesPerSession}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>


        </div>
    )
}

function StatCard({ label, value, href }: { label: string, value: number, href: string }) {
    return (
        <Link href={href} className="bg-white/5 rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-colors cursor-pointer block">
            <p className="text-white/50 text-xs uppercase tracking-wide">{label}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </Link>
    )
}

function QualityRow({ label, count, color }: { label: string, count: number, color: string }) {
    const colors = {
        green: 'bg-green-400',
        yellow: 'bg-yellow-400',
        orange: 'bg-orange-400',
        red: 'bg-red-400'
    }
    return (
        <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${colors[color as keyof typeof colors]}`} />
            <span className="text-white/70 text-sm">{label} ({count})</span>
        </div>
    )
}
