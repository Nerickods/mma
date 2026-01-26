import { streamText } from 'ai'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { createClient } from '@/shared/lib/supabase/server'
import { cookies } from 'next/headers'

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
})

const DEFAULT_SYSTEM_PROMPT = `Eres Blackbird AI, el asistente virtual de MMA Academy. Tu objetivo es ayudar a los visitantes con información sobre:
- Clases y disciplinas disponibles (MMA, Muay Thai, Jiu-Jitsu, Boxing)
- Horarios de clases
- Precios y planes de membresía
- Visitas de prueba gratuitas
- Información general del gimnasio

Sé amable, profesional y motivador. Responde en español de manera concisa.`

// Generate or get visitor ID from cookie
async function getVisitorId(requestVisitorId?: string): Promise<string> {
    const cookieStore = await cookies()
    let visitorId = requestVisitorId || cookieStore.get('visitor_id')?.value

    if (!visitorId) {
        visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(7)}`
    }

    return visitorId
}

export async function POST(req: Request) {
    const { messages, conversationId: requestConversationId, visitorId: requestVisitorId } = await req.json()
    const visitorId = await getVisitorId(requestVisitorId)

    const supabase = await createClient()

    // Get agent configuration
    const { data: agent } = await supabase
        .from('agents')
        .select('id, system_prompt, model_id, temperature, max_tokens')
        .eq('is_active', true)
        .single()

    const systemPrompt = agent?.system_prompt || DEFAULT_SYSTEM_PROMPT
    const modelId = agent?.model_id || 'google/gemini-2.0-flash-001'
    const temperature = agent?.temperature || 0.7

    // REUTILIZAR conversación existente o crear nueva
    let currentConversationId = requestConversationId

    if (requestConversationId) {
        // Verify conversation exists
        const { data: existingConv } = await supabase
            .from('conversations')
            .select('id')
            .eq('id', requestConversationId)
            .single()

        if (existingConv) {
            currentConversationId = existingConv.id
        } else {
            // Conversation doesn't exist, create new
            currentConversationId = null
        }
    }

    // Create new conversation only if we don't have one
    if (!currentConversationId) {
        const { data: newConv, error: convError } = await supabase
            .from('conversations')
            .insert({
                visitor_id: visitorId,
                agent_id: agent?.id,
                visitor_metadata: { userAgent: req.headers.get('user-agent') }
            })
            .select('id')
            .single()

        if (!convError && newConv) {
            currentConversationId = newConv.id
        }
    }

    // Save user message (last one in the array)
    const lastUserMessage = messages[messages.length - 1]
    if (currentConversationId && lastUserMessage?.role === 'user') {
        await supabase
            .from('messages')
            .insert({
                conversation_id: currentConversationId,
                role: 'user',
                content: lastUserMessage.content,
            })
    }

    const result = streamText({
        model: openrouter(modelId),
        system: systemPrompt,
        messages,
        temperature,
        onFinish: async ({ text }) => {
            try {
                if (currentConversationId) {
                    // Save assistant message
                    await supabase
                        .from('messages')
                        .insert({
                            conversation_id: currentConversationId,
                            role: 'assistant',
                            content: text,
                        })

                    // Update conversation updated_at
                    await supabase
                        .from('conversations')
                        .update({ updated_at: new Date().toISOString() })
                        .eq('id', currentConversationId)
                }
            } catch (error) {
                console.error('Failed to save message:', error)
            }
        },
    })

    // Create response with conversation ID and visitor cookie
    const response = result.toTextStreamResponse()

    // Set headers for client to track conversation
    response.headers.set('Set-Cookie', `visitor_id=${visitorId}; Path=/; Max-Age=31536000; SameSite=Lax`)
    response.headers.set('X-Conversation-Id', currentConversationId || '')
    response.headers.set('Access-Control-Expose-Headers', 'X-Conversation-Id')

    return response
}
