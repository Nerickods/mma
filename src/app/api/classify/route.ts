import { NextResponse } from 'next/server'
import { createClient } from '@/shared/lib/supabase/server'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { generateText } from 'ai'

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
})

export async function POST() {
    const supabase = await createClient()

    // Get unclassified sessions
    const { data: sessions, error } = await supabase
        .from('conversation_sessions')
        .select('*')
        .is('classification', null)
        .order('first_message_at', { ascending: false })
        .limit(10)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!sessions || sessions.length === 0) {
        return NextResponse.json({ sessionsClassified: 0 })
    }

    // Get agent configuration
    const { data: agent } = await supabase
        .from('agents')
        .select('classification_topics')
        .eq('is_active', true)
        .single()

    const topics = agent?.classification_topics || ['general', 'soporte', 'ventas', 'otro']

    let classifiedCount = 0

    for (const session of sessions) {
        if (!session.transcript) continue

        try {
            const { text } = await generateText({
                model: openrouter('google/gemini-2.0-flash-001'),
                prompt: `Analiza la conversación y responde SOLO con JSON válido (sin markdown):
{
  "topics": [array de topics de la lista permitida],
  "intent": "learning|troubleshooting|exploration|onboarding|feedback",
  "quality": "high|medium|low|spam",
  "summary": "Resumen de 1-2 oraciones en español",
  "flags": {
    "frustration_detected": boolean,
    "escalation_needed": boolean,
    "bug_reported": boolean,
    "resolved": boolean
  }
}

TOPICS DISPONIBLES: ${JSON.stringify(topics)}

CONVERSACIÓN:
${session.transcript}`,
            })

            // Parse the classification
            const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()
            const classification = JSON.parse(cleanedText)

            // Update the session
            await supabase
                .from('conversation_sessions')
                .update({
                    classification,
                    classified_at: new Date().toISOString(),
                    classified_by_model: 'google/gemini-2.0-flash-001',
                })
                .eq('id', session.id)

            classifiedCount++
        } catch (err) {
            console.error(`Failed to classify session ${session.id}:`, err)
        }
    }

    return NextResponse.json({ sessionsClassified: classifiedCount })
}
