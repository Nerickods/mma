import { SupabaseClient } from '@supabase/supabase-js'

/**
 * Synchronizes conversations to conversation_sessions table.
 * ensuring that analytics data is always up-to-date with raw messages.
 */
export async function syncSessions(supabase: SupabaseClient) {
    try {
        console.log('Starting session synchronization...')

        // 1. Get all conversations that have messages
        const { data: conversations, error: convError } = await supabase
            .from('conversations')
            .select(`
                id,
                agent_id,
                created_at,
                updated_at,
                messages (
                    id,
                    role,
                    content,
                    created_at
                )
            `)
            .order('updated_at', { ascending: false })

        if (convError) throw convError

        if (!conversations) return { syncedCount: 0, error: null }

        let syncedCount = 0

        // 2. Process each conversation
        for (const conv of conversations) {
            const messages = conv.messages || []

            // Skip empty conversations
            if (messages.length === 0) continue

            // Sort messages by time
            const sortedMessages = messages.sort((a, b) =>
                new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            )

            const firstMessage = sortedMessages[0]
            const lastMessage = sortedMessages[sortedMessages.length - 1]

            const userMessageCount = messages.filter(m => m.role === 'user').length
            const assistantMessageCount = messages.filter(m => m.role === 'assistant').length

            // Create transcript
            const transcript = sortedMessages
                .map(m => `${m.role.toUpperCase()}: ${m.content}`)
                .join('\n\n')

            const sessionData = {
                conversation_id: conv.id,
                agent_id: conv.agent_id,
                first_message_at: firstMessage.created_at,
                last_message_at: lastMessage.created_at,
                message_count: messages.length,
                user_message_count: userMessageCount,
                assistant_message_count: assistantMessageCount,
                transcript: transcript
            }

            // 3. Manual UPSERT to avoid "ON CONFLICT" errors if unique constraint is missing
            try {
                // Check if session exists
                const { data: existingSession } = await supabase
                    .from('conversation_sessions')
                    .select('id')
                    .eq('conversation_id', conv.id)
                    .single()

                let error
                if (existingSession) {
                    // Update
                    const { error: updateError } = await supabase
                        .from('conversation_sessions')
                        .update(sessionData)
                        .eq('id', existingSession.id)
                    error = updateError
                } else {
                    // Insert
                    const { error: insertError } = await supabase
                        .from('conversation_sessions')
                        .insert(sessionData)
                    error = insertError
                }

                if (!error) {
                    syncedCount++
                } else {
                    console.error(`Failed to sync session for conversation ${conv.id}:`, error)
                }
            } catch (err) {
                console.error(`Error processing session for ${conv.id}:`, err)
            }
        }

        console.log(`Synchronization complete. Synced ${syncedCount} sessions.`)
        return { syncedCount, error: null }

    } catch (error) {
        console.error('Session synchronization failed:', error)
        return { syncedCount: 0, error }
    }
}
