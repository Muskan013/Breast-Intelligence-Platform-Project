import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/useChat";
import { Layers, Bot, User } from "lucide-react";

export default function AIAssistantChat() {
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section id="assistant" className="mb-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Gemini AI Medical Assistant</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Get answers to your medical questions from our Gemini-powered assistant
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-primary-500 to-blue-600 text-white flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Gemini Medical Assistant</CardTitle>
            <p className="text-sm text-blue-100">Ask questions about breast cancer diagnosis & care</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center">
            <Bot className="text-white h-5 w-5" />
          </div>
        </CardHeader>
        
        <CardContent className="h-96 p-6 overflow-y-auto bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex mb-4">
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white mr-3 flex-shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                <p className="text-gray-700">
                  Hello! I'm your Gemini-powered medical assistant. I can answer questions about breast cancer detection, diagnosis, and treatment options. How can I help you today?
                </p>
                <span className="text-xs text-gray-500 mt-1 block">{formatTime(new Date().toISOString())}</span>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex mb-4 ${message.role === 'user' ? 'justify-end' : ''}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white mr-3 flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                
                <div className={`p-3 rounded-lg shadow-sm max-w-[80%] ${
                  message.role === 'user' ? 'bg-primary-100 text-gray-800' : 'bg-white text-gray-700'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs text-gray-500 mt-1 block">{formatTime(message.timestamp)}</span>
                </div>
                
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 ml-3 flex-shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex mb-4">
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white mr-3 flex-shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="flex space-x-1">
                  <div className="bg-gray-300 w-2 h-2 rounded-full animate-pulse"></div>
                  <div className="bg-gray-300 w-2 h-2 rounded-full animate-pulse delay-100"></div>
                  <div className="bg-gray-300 w-2 h-2 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>
        
        <CardFooter className="p-4 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex items-center w-full">
            <Input
              type="text"
              placeholder="Type your medical question here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow rounded-lg border border-gray-300 py-3 px-4 focus:ring-2 focus:ring-primary-500"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="ml-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg p-3"
              disabled={isLoading || !input.trim()}
            >
              <Layers className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-2 w-full text-center">
            For medical emergencies, please call emergency services or visit your nearest hospital.
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
