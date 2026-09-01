import { useState, useCallback, useEffect } from 'react';
import { ChatService } from '../services/chat/ChatService';
import type { ChatMessage } from '../types/chat';

export function useChat(tripId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ChatService.getInstance().getMessages(tripId);
      setMessages(data);
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : 'Unknown error') || 'Failed to fetch messages');
    } finally {
      setIsLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const sendMessage = useCallback(async (text: string) => {
    try {
      // Optimistic update
      const tempMsg: ChatMessage = {
        id: `temp-${Date.now()}`,
        text,
        sender: 'driver',
        timestamp: new Date().toISOString(),
        status: 'sent'
      };
      setMessages((prev) => [...prev, tempMsg]);

      const sentMsg = await ChatService.getInstance().sendMessage(tripId, text);
      
      setMessages((prev) => prev.map(m => m.id === tempMsg.id ? sentMsg : m));
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : 'Unknown error') || 'Failed to send message');
      // Rollback optimistic update
      await fetchMessages();
    }
  }, [tripId, fetchMessages]);

  const markAsRead = useCallback(async () => {
    try {
      await ChatService.getInstance().markAsRead(tripId);
    } catch (err) {
      console.warn('Failed to mark messages as read', err);
    }
  }, [tripId]);

  return { messages, isLoading, error, fetchMessages, sendMessage, markAsRead };
}
