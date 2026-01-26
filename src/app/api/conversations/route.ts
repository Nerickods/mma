import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/shared/lib/supabase/server'

export async function GET(request: NextRequest) {
    const supabase = await createClient()

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // Get total count from conversations
    const { count } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })

    // Get conversations with their messages
    const { data: conversations, error } = await supabase
        .from('conversations')
        .select(`
            id,
            visitor_id,
            visitor_metadata,
            created_at,
            updated_at,
            agent_id,
            messages (
                id,
                role,
                content,
                created_at
            )
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform conversations into session-like format for the UI
    const sessions = (conversations || []).map(conv => {
        const messages = conv.messages || []
        const sortedMessages = messages.sort((a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )

        const userMessages = messages.filter(m => m.role === 'user')
        const assistantMessages = messages.filter(m => m.role === 'assistant')

        // Create transcript
        const transcript = sortedMessages
            .map(m => `${m.role.toUpperCase()}: ${m.content}`)
            .join('\n\n')

        return {
            id: conv.id,
            conversation_id: conv.id,
            first_message_at: sortedMessages[0]?.created_at || conv.created_at,
            last_message_at: sortedMessages[sortedMessages.length - 1]?.created_at || conv.updated_at,
            message_count: messages.length,
            user_message_count: userMessages.length,
            assistant_message_count: assistantMessages.length,
            transcript: transcript || null,
            classification: null,
            classified_at: null,
            visitor_id: conv.visitor_id,
        }
    }).filter(s => s.message_count > 0) // Only show conversations with messages

    return NextResponse.json({
        sessions,
        pagination: {
            page,
            limit,
            total: count || 0,
            totalPages: Math.ceil((count || 0) / limit),
        },
    })
}
