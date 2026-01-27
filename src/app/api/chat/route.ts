import { streamText, tool } from 'ai'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { createClient } from '@/shared/lib/supabase/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
})

const BRANDING_SYSTEM_PROMPT = `Eres Blackbird AI, el entrenador y mentor virtual de Blackbird House MMA.
TU IDENTIDAD:
- Eres un atleta de élite estoico pero accesible. No "vendes", retas a las personas a mejorar.
- Valoras el honor, el respeto, la disciplina y la superación personal por encima de todo.
- Tu tono es motivador, directo, conciso y profesional. Evita el exceso de entusiasmo falso.

TUS REGLAS DE ORO (Reglamento Interno):
1. El respeto es innegociable.
2. La higiene es crítica: toalla y desodorante obligatorios.
3. Puntualidad: Llegar 10 minutos antes.
4. Privacidad: Los datos están protegidos.

TU OBJETIVO PRINCIPAL:
- Convertir la curiosidad en una VISITA AGENDADA.

PROCESO DE CAPTURA DE LEADS (IMPORTANTE):
1. Cuando el usuario acepte la visita o pida información que requiera contacto:
   - Pide: **Nombre**, **Correo Electrónico** y **Fecha tentativa de visita** (ej: "mañana", "lunes", "25 de enero").
2. **CONFIRMACIÓN OBLIGATORIA**:
   - Una vez tengas los 3 datos, REPITELOS al usuario para confirmar.
   - Ejemplo: "Entendido [Nombre]. Confirmo: Correo [Email] para visita el [Fecha]. ¿Es correcto?"
3. Solo cuando el usuario diga "Sí" o confirme, EJECUTA la herramienta 'saveLead'.
   - Si dice "No" o corrige, actualiza los datos y vuelve a confirmar.

OFERTA GANCHO:
- "Tu primera visita corre por cuenta de la casa. ¿Te anoto para esta semana?"

Responde siempre en español.`

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

    // Get agent configuration or use Default Branding
    const { data: agent } = await supabase
        .from('agents')
        .select('id, system_prompt, model_id, temperature, max_tokens')
        .eq('is_active', true)
        .single()

    // Use DB prompt if available, otherwise use code constant
    // NOTE: To update what is shown in Admin Panel, we must update the DB record.
    const systemPrompt = agent?.system_prompt || BRANDING_SYSTEM_PROMPT
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
        tools: {
            saveLead: tool({
                description: 'Guardar datos confirmados para agendar visita',
                parameters: z.object({
                    name: z.string().describe('Nombre del usuario'),
                    email: z.string().describe('Correo electrónico del usuario'),
                    date: z.string().describe('Fecha de visita en formato ISO o lenguaje natural claro (ej: 2024-02-20, Mañana)')
                }),
                execute: async ({ name, email, date }: { name: string, email: string, date: string }) => {
                    try {
                        const { error } = await supabase
                            .from('leads')
                            .insert({
                                name,
                                email,
                                visit_date: date,
                                source: 'chat_agent',
                                visitor_id: visitorId,
                                conversation_id: currentConversationId
                            })

                        if (error) {
                            console.error('Error saving lead:', error)
                            return 'Hubo un error técnico. Por favor intenta más tarde.'
                        }

                        return '¡Confirmado! Tu visita ha sido agendada en nuestro sistema. Te esperamos.'
                    } catch (e) {
                        console.error('Exception saving lead:', e)
                        return 'Error al procesar la solicitud.'
                    }
                }
            })
        },
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
