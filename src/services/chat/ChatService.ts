import { ApiClient } from '../api/ApiClient';
import { env } from '../../config/env';
import type { ChatMessage } from '../../types/chat';
import { mockChatMessages } from '../../data/mockData';

export interface IChatService {
  getMessages(tripId: string): Promise<ChatMessage[]>;
  sendMessage(tripId: string, text: string): Promise<ChatMessage>;
  markAsRead(tripId: string): Promise<void>;
}

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export class MockChatService implements IChatService {
  async getMessages(_tripId: string): Promise<ChatMessage[]> {
    await delay(500);
    return [...mockChatMessages];
  }

  async sendMessage(_tripId: string, text: string): Promise<ChatMessage> {
    await delay(300);
    return {
      id: `msg-${Date.now()}`,
      text,
      sender: 'driver',
      timestamp: new Date().toISOString(),
      status: 'sent',
    };
  }

  async markAsRead(_tripId: string): Promise<void> {
    await delay(200);
  }
}

export class ApiChatService implements IChatService {
  private client = ApiClient.getInstance();

  async getMessages(tripId: string): Promise<ChatMessage[]> {
    return this.client.get<ChatMessage[]>(`/chat/${tripId}/messages`);
  }

  async sendMessage(tripId: string, text: string): Promise<ChatMessage> {
    return this.client.post<ChatMessage>(`/chat/${tripId}/messages`, { text }, { retryable: true });
  }

  async markAsRead(tripId: string): Promise<void> {
    await this.client.post(`/chat/${tripId}/read`, {}, { retryable: true });
  }
}

export class ChatService {
  private static instance: IChatService;

  static getInstance(): IChatService {
    if (!ChatService.instance) {
      ChatService.instance = env.IS_MOCK_MODE ? new MockChatService() : new ApiChatService();
    }
    return ChatService.instance;
  }
}