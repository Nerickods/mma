'use client'

import { useEffect, useState } from 'react'

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
}

export default function AnalyticsPage() {
    const [analytics, setAnalytics] = useState<Analytics | null>(null)
    const [loading, setLoading] = useState(true)

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
                <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                    <p className="text-white/50 text-xs uppercase tracking-wide">Sesiones</p>
                    <p className="text-2xl font-bold text-white mt-1">
                        {analytics.overview.totalSessions}
                    </p>
                </div>
                <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                    <p className="text-white/50 text-xs uppercase tracking-wide">Mensajes</p>
                    <p className="text-2xl font-bold text-white mt-1">
                        {analytics.overview.totalMessages}
                    </p>
                </div>
                <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                    <p className="text-white/50 text-xs uppercase tracking-wide">Clasificados</p>
                    <p className="text-2xl font-bold text-white mt-1">
                        {analytics.overview.classifiedCount}
                    </p>
                </div>
                <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                    <p className="text-white/50 text-xs uppercase tracking-wide">Tasa Resolución</p>
                    <p
                        className={`text-2xl font-bold mt-1 ${analytics.overview.resolutionRate >= 80
                                ? 'text-green-400'
                                : analytics.overview.resolutionRate >= 50
                                    ? 'text-yellow-400'
                                    : 'text-red-400'
                            }`}
                    >
                        {analytics.overview.resolutionRate}%
                    </p>
                </div>
                <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                    <p className="text-white/50 text-xs uppercase tracking-wide">Pendientes</p>
                    <p
                        className={`text-2xl font-bold mt-1 ${analytics.overview.unclassifiedCount > 0 ? 'text-yellow-400' : 'text-green-400'
                            }`}
                    >
                        {analytics.overview.unclassifiedCount}
                    </p>
                </div>
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
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            className="text-white/10"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">{totalQuality}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-green-400" />
                                    <span className="text-white/70 text-sm">Alta ({analytics.qualityDistribution.high})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <span className="text-white/70 text-sm">Media ({analytics.qualityDistribution.medium})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-orange-400" />
                                    <span className="text-white/70 text-sm">Baja ({analytics.qualityDistribution.low})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-red-400" />
                                    <span className="text-white/70 text-sm">Spam ({analytics.qualityDistribution.spam})</span>
                                </div>
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
                                <div key={topic.topic}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-white/80">{topic.topic}</span>
                                        <span className="text-white/50">{topic.count} ({topic.percentage}%)</span>
                                    </div>
                                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${topic.percentage}%`,
                                                backgroundColor: `hsl(${220 - i * 30}, 70%, 60%)`,
                                            }}
                                        />
                                    </div>
                                </div>
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
                                    <th className="pb-3 pr-4">Alta Calidad</th>
                                    <th className="pb-3">Msgs/Sesión</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics.painPoints.map((pp) => (
                                    <tr key={pp.topic} className="border-b border-white/5">
                                        <td className="py-3 pr-4 text-white/80">{pp.topic}</td>
                                        <td className="py-3 pr-4 text-white/60">{pp.sessionCount}</td>
                                        <td className="py-3 pr-4">
                                            <span
                                                className={`${pp.frustrationRate >= 50
                                                        ? 'text-red-400'
                                                        : pp.frustrationRate >= 25
                                                            ? 'text-orange-400'
                                                            : 'text-green-400'
                                                    }`}
                                            >
                                                {pp.frustrationRate}%
                                            </span>
                                        </td>
                                        <td className="py-3 pr-4">
                                            <span
                                                className={`${pp.unresolvedRate >= 50
                                                        ? 'text-red-400'
                                                        : pp.unresolvedRate >= 25
                                                            ? 'text-yellow-400'
                                                            : 'text-green-400'
                                                    }`}
                                            >
                                                {pp.unresolvedRate}%
                                            </span>
                                        </td>
                                        <td className="py-3 pr-4">
                                            <span
                                                className={`${pp.highQualityRate >= 70
                                                        ? 'text-green-400'
                                                        : pp.highQualityRate >= 40
                                                            ? 'text-yellow-400'
                                                            : 'text-red-400'
                                                    }`}
                                            >
                                                {pp.highQualityRate}%
                                            </span>
                                        </td>
                                        <td className="py-3 text-white/60">{pp.avgMessagesPerSession}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Content Gaps */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="text-white font-medium mb-2">Content Gaps</h3>
                <p className="text-white/50 text-sm mb-4">
                    Priorización de contenido basada en frustración y resolución
                </p>

                {analytics.contentGaps.length === 0 ? (
                    <p className="text-white/40 text-sm">No hay datos todavía</p>
                ) : (
                    <div className="space-y-3">
                        {analytics.contentGaps.map((gap) => (
                            <div
                                key={gap.topic}
                                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                            >
                                <div className="flex items-center gap-4">
                                    <RecommendationBadge recommendation={gap.recommendation} />
                                    <div>
                                        <p className="text-white font-medium">{gap.topic}</p>
                                        <p className="text-white/50 text-sm">
                                            {gap.sessionCount} sesiones · {gap.frustrationRate}% frustración ·{' '}
                                            {gap.resolutionRate}% resolución
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-white/40 text-xs">Gap Score</p>
                                    <p className="text-xl font-bold text-white">{gap.gapScore}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

function RecommendationBadge({
    recommendation,
}: {
    recommendation: 'urgent' | 'recommended' | 'monitor' | 'ok'
}) {
    const config = {
        urgent: { bg: 'bg-red-500', text: 'URGENTE' },
        recommended: { bg: 'bg-orange-500', text: 'RECOMENDADO' },
        monitor: { bg: 'bg-yellow-500 text-black', text: 'MONITOREAR' },
        ok: { bg: 'bg-green-500', text: 'OK' },
    }

    const { bg, text } = config[recommendation]

    return (
        <span className={`px-2 py-1 text-xs font-medium rounded ${bg} text-white`}>
            {text}
        </span>
    )
}
