import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { sendChatMessage, getChatHistory, ChatMessage } from "@/lib/gemini";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load chat history on initial load
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await getChatHistory();
        if (history.length > 0) {
          setMessages(history);
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    };

    loadHistory();
  }, []);

  const sendMessage = async (content: string) => {
    // Add user message immediately for better UX
    const userMessage: ChatMessage = {
      role: "user",
      content,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      const { response, timestamp } = await sendChatMessage(content);
      
      // Add AI response
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response,
        timestamp
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Message Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
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
