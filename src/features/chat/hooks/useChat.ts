import { useState, useRef, useEffect } from 'react';
import { ChatMessage, SendMessageResponse } from '../types';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // Persist conversationId in localStorage so context survives refreshes
    const [conversationId, setConversationId] = useLocalStorage<string | undefined>('chat_conversation_id', undefined);

    const sendMessage = async (content: string) => {
        // Optimistic Update
        const tempMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content,
            created_at: new Date().toISOString()
        };
        setMessages((prev) => [...prev, tempMessage]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: content,
                    conversationId
                })
            });

            if (!response.ok) throw new Error('Failed to send message');

            const data: SendMessageResponse = await response.json();

            // Update Conversation ID if it's new
            if (!conversationId) {
                setConversationId(data.conversationId);
            }

            setMessages((prev) => [...prev, data.message]);
        } catch (error) {
            console.error('Failed to send message:', error);
            // Optional: Add error message to chat
            setMessages((prev) => [...prev, {
                id: Date.now().toString(),
                role: 'system',
                content: 'Hubo un error al conectar con el asistente. Por favor intenta de nuevo.',
                created_at: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages,
        isLoading,
        sendMessage
    };
}
