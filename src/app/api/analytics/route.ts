import { NextResponse } from 'next/server'
import { createClient } from '@/shared/lib/supabase/server'

export async function GET() {
    const supabase = await createClient()

    // Get all conversation sessions
    const { data: sessions } = await supabase
        .from('conversation_sessions')
        .select('*')
        .order('first_message_at', { ascending: false })

    if (!sessions || sessions.length === 0) {
        return NextResponse.json({
            overview: {
                totalSessions: 0,
                totalMessages: 0,
                classifiedCount: 0,
                unclassifiedCount: 0,
                resolutionRate: 0,
            },
            alerts: {
                frustrationCount: 0,
                escalationNeeded: 0,
                bugsReported: 0,
            },
            qualityDistribution: {
                high: 0,
                medium: 0,
                low: 0,
                spam: 0,
            },
            topTopics: [],
            painPoints: [],
            contentGaps: [],
            interventionQueue: [],
        })
    }

    // Calculate overview
    const totalSessions = sessions.length
    const totalMessages = sessions.reduce((acc, s) => acc + (s.message_count || 0), 0)
    const classifiedSessions = sessions.filter(s => s.classification)
    const classifiedCount = classifiedSessions.length
    const unclassifiedCount = totalSessions - classifiedCount

    // Calculate resolution rate
    const resolvedCount = classifiedSessions.filter(
        s => s.classification?.flags?.resolved
    ).length
    const resolutionRate = classifiedCount > 0
        ? Math.round((resolvedCount / classifiedCount) * 100)
        : 0

    // Alerts
    const frustrationCount = classifiedSessions.filter(
        s => s.classification?.flags?.frustration_detected
    ).length
    const escalationNeeded = classifiedSessions.filter(
        s => s.classification?.flags?.escalation_needed
    ).length
    const bugsReported = classifiedSessions.filter(
        s => s.classification?.flags?.bug_reported
    ).length

    // Quality distribution
    const qualityDistribution = {
        high: classifiedSessions.filter(s => s.classification?.quality === 'high').length,
        medium: classifiedSessions.filter(s => s.classification?.quality === 'medium').length,
        low: classifiedSessions.filter(s => s.classification?.quality === 'low').length,
        spam: classifiedSessions.filter(s => s.classification?.quality === 'spam').length,
    }

    // Top topics
    const topicCounts: Record<string, number> = {}
    classifiedSessions.forEach(s => {
        const topics = s.classification?.topics || []
        topics.forEach((topic: string) => {
            topicCounts[topic] = (topicCounts[topic] || 0) + 1
        })
    })

    const topTopics = Object.entries(topicCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([topic, count]) => ({
            topic,
            count,
            percentage: Math.round((count / classifiedCount) * 100),
        }))

    // Pain points by topic
    const painPoints = topTopics.map(({ topic }) => {
        const topicSessions = classifiedSessions.filter(
            s => s.classification?.topics?.includes(topic)
        )
        const frustrationRate = Math.round(
            (topicSessions.filter(s => s.classification?.flags?.frustration_detected).length /
                topicSessions.length) * 100
        )
        const unresolvedRate = Math.round(
            (topicSessions.filter(s => !s.classification?.flags?.resolved).length /
                topicSessions.length) * 100
        )
        const highQualityRate = Math.round(
            (topicSessions.filter(s => s.classification?.quality === 'high').length /
                topicSessions.length) * 100
        )
        const avgMessagesPerSession = Math.round(
            topicSessions.reduce((acc, s) => acc + (s.message_count || 0), 0) /
            topicSessions.length
        )

        return {
            topic,
            sessionCount: topicSessions.length,
            frustrationRate,
            unresolvedRate,
            highQualityRate,
            avgMessagesPerSession,
        }
    })

    // Content gaps
    const contentGaps = painPoints.map(pp => {
        const resolutionRate = 100 - pp.unresolvedRate
        const gapScore = Math.round((pp.sessionCount * pp.frustrationRate) / (resolutionRate || 1))

        let recommendation: 'urgent' | 'recommended' | 'monitor' | 'ok'
        if (gapScore >= 50) recommendation = 'urgent'
        else if (gapScore >= 20) recommendation = 'recommended'
        else if (gapScore >= 10) recommendation = 'monitor'
        else recommendation = 'ok'

        return {
            topic: pp.topic,
            sessionCount: pp.sessionCount,
            frustrationRate: pp.frustrationRate,
            resolutionRate,
            gapScore,
            recommendation,
        }
    }).sort((a, b) => b.gapScore - a.gapScore)

    // Intervention queue
    const interventionQueue = classifiedSessions
        .filter(s =>
            s.classification?.flags?.frustration_detected ||
            s.classification?.flags?.escalation_needed ||
            s.classification?.flags?.bug_reported
        )
        .slice(0, 10)
        .map(s => {
            const hoursAgo = Math.round(
                (Date.now() - new Date(s.first_message_at).getTime()) / (1000 * 60 * 60)
            )

            let severity: 'critical' | 'high' | 'medium'
            if (s.classification?.flags?.escalation_needed) severity = 'critical'
            else if (s.classification?.flags?.frustration_detected) severity = 'high'
            else severity = 'medium'

            return {
                id: s.id,
                summary: s.classification?.summary || 'Sin resumen',
                severity,
                flags: {
                    frustration: s.classification?.flags?.frustration_detected || false,
                    escalation: s.classification?.flags?.escalation_needed || false,
                    bug: s.classification?.flags?.bug_reported || false,
                },
                hoursAgo,
            }
        })

    return NextResponse.json({
        overview: {
            totalSessions,
            totalMessages,
            classifiedCount,
            unclassifiedCount,
            resolutionRate,
        },
        alerts: {
            frustrationCount,
            escalationNeeded,
            bugsReported,
        },
        qualityDistribution,
        topTopics,
        painPoints,
        contentGaps,
        interventionQueue,
    })
}
