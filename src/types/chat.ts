export interface ChatMessage {
  id: string;
  text?: string;
  imageUrl?: string;
  sender: 'driver' | 'rider' | 'system';
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
}