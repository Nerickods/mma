import { NextResponse } from 'next/server'
import { createClient } from '@/shared/lib/supabase/server'

// Test endpoint to check database tables and insert a test conversation
export async function GET() {
    const supabase = await createClient()

    const results: Record<string, unknown> = {}

    // 1. Check if agents table exists and has data
    const { data: agents, error: agentsError } = await supabase
        .from('agents')
        .select('*')
        .limit(5)

    results.agents = {
        data: agents,
        error: agentsError?.message,
        count: agents?.length || 0
    }

    // 2. Check conversations table
    const { data: conversations, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .limit(5)

    results.conversations = {
        data: conversations,
        error: convError?.message,
        count: conversations?.length || 0
    }

    // 3. Check messages table
    const { data: messages, error: msgError } = await supabase
        .from('messages')
        .select('*')
        .limit(5)

    results.messages = {
        data: messages,
        error: msgError?.message,
        count: messages?.length || 0
    }

    // 4. Check conversation_sessions table
    const { data: sessions, error: sessError } = await supabase
        .from('conversation_sessions')
        .select('*')
        .limit(5)

    results.conversation_sessions = {
        data: sessions,
        error: sessError?.message,
        count: sessions?.length || 0
    }

    // 5. Try to insert a test conversation
    const testVisitorId = `test_${Date.now()}`
    const { data: testConv, error: testConvError } = await supabase
        .from('conversations')
        .insert({
            visitor_id: testVisitorId,
            visitor_metadata: { test: true }
        })
        .select('id')
        .single()

    results.insert_test = {
        success: !testConvError,
        data: testConv,
        error: testConvError?.message
    }

    // 6. If conversation created, insert a test message
    if (testConv?.id) {
        const { error: testMsgError } = await supabase
            .from('messages')
            .insert({
                conversation_id: testConv.id,
                role: 'user',
                content: 'Test message from debug endpoint'
            })

        results.insert_message = {
            success: !testMsgError,
            error: testMsgError?.message
        }

        // 7. Insert test session
        const { error: testSessError } = await supabase
            .from('conversation_sessions')
            .insert({
                conversation_id: testConv.id,
                first_message_at: new Date().toISOString(),
                last_message_at: new Date().toISOString(),
                message_count: 1,
                user_message_count: 1,
                assistant_message_count: 0,
                transcript: 'user: Test message from debug endpoint'
            })

        results.insert_session = {
            success: !testSessError,
            error: testSessError?.message
        }
    }

    return NextResponse.json(results)
}
