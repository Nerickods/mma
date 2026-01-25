import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/shared/lib/supabase';
import { openAiService } from '@/features/chat/services/openAiService';
import { ChatMessage } from '@/features/chat/types';

export const maxDuration = 60; // Allow up to 60 seconds for tool usage


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { message, conversationId: existingConversationId } = body;

        let conversationId = existingConversationId;

        // 1. Create Conversation if needed
        if (!conversationId) {
            const { data: conversation, error: convError } = await supabase
                .from('chat_conversations')
                .insert([{ metadata: {} }])
                .select()
                .single();

            if (convError) throw convError;
            conversationId = conversation.id;
        }

        // 2. Save User Message
        const { error: msgError } = await supabase
            .from('chat_messages')
            .insert([{
                conversation_id: conversationId,
                role: 'user',
                content: message
            }]);

        if (msgError) throw msgError;

        // 3. Fetch History (Last 10 messages for context)
        const { data: historyData, error: historyError } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: false }) // Get latest first
            .limit(10); // Limit context window

        if (historyError) throw historyError;

        // Reorder to chronological (oldest -> newest) for OpenAI
        const chronologicalHistory = historyData.reverse();

        // Format for OpenAI (exclude ID, created_at, etc.)
        const rawHistory = chronologicalHistory;

        // Robust Sanitization using reduce
        const openAiHistory = rawHistory.reduce((acc: any[], msg: any, index: number, arr: any[]) => {
            // 1. Handle Tool Messages (Remove orphans)
            if (msg.role === 'tool') {
                const prev = arr[index - 1];
                // Must have previous msg, must be assistant, must have matching tool_call_id
                const isValidParent = prev &&
                    prev.role === 'assistant' &&
                    prev.tool_calls &&
                    prev.tool_calls.some((tc: any) => tc.id === msg.tool_call_id);

                if (!isValidParent) {
                    console.warn(`[Sanitizer] Dropping Orphan Tool Message: ${msg.id}`);
                    return acc;
                }
            }

            // 2. Handle Assistant Messages with Tool Calls (Remove dangling)
            if (msg.role === 'assistant' && msg.tool_calls && msg.tool_calls.length > 0) {
                const next = arr[index + 1];
                // Must have next msg, must be tool, must match first tool call id
                const hasToolResponse = next &&
                    next.role === 'tool' &&
                    next.tool_call_id === msg.tool_calls[0].id;

                if (!hasToolResponse) {
                    console.warn(`[Sanitizer] Dropping Dangling Assistant Tool Call: ${msg.id}`);
                    return acc;
                }
            }

            // Valid Message - Add to history
            acc.push({
                role: msg.role,
                content: msg.content,
                tool_calls: msg.tool_calls || undefined,
                tool_call_id: msg.tool_call_id || undefined
            });
            return acc;
        }, []);

        console.log('[Chat API] Final Validated Payload size:', openAiHistory.length);
        if (openAiHistory.length > 0) {
            console.log('[Chat API] Last message in payload:', JSON.stringify(openAiHistory[openAiHistory.length - 1]));
        }

        // 4. Process with OpenAI (now returns an array of messages)
        const assistantResponses = await openAiService.processChat(openAiHistory);

        // 5. Save All Assistant/Tool Messages (BATCH INSERT)
        if (assistantResponses.length > 0) {
            const messagesToInsert = assistantResponses.map(response => ({
                conversation_id: conversationId,
                role: response.role,
                content: response.content || null,
                tool_calls: response.tool_calls || null,
                tool_call_id: response.tool_call_id || null
            }));

            const { error: saveError } = await supabase
                .from('chat_messages')
                .insert(messagesToInsert);

            if (saveError) throw saveError;
        }

        // Get the last message to return to the UI
        const lastAssistantMessage = assistantResponses[assistantResponses.length - 1];

        // 6. Return Response
        return NextResponse.json({
            conversationId,
            message: lastAssistantMessage
        });

    } catch (error: any) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
