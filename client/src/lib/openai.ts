import { apiRequest } from './queryClient';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatResponse {
  response: string;
  timestamp: string;
}

export const sendChatMessage = async (message: string): Promise<ChatResponse> => {
  try {
    const response = await apiRequest('POST', '/api/chat', { message });
    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw new Error('Failed to send message to AI assistant');
  }
};

export const getChatHistory = async (): Promise<ChatMessage[]> => {
  try {
    const response = await apiRequest('GET', '/api/chat');
    const data = await response.json();
    return data.messages;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw new Error('Failed to fetch chat history');
  }
};
