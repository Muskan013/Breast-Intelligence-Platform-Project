import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/useChat";
import { Send, Bot, User, RefreshCw, MessageSquare } from "lucide-react";

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
    <section id="assistant" className="section-futuristic relative py-20 overflow-hidden bg-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -top-40 left-20 z-0"></div>
        <div className="absolute w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] bottom-20 -right-20 z-0"></div>
        <div className="bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNmMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PGNpcmNsZSBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjQwIiBjeT0iMzAiIHI9IjEiLz48Y2lyY2xlIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI0MCIgY3k9IjQwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] absolute inset-0 opacity-10 z-0"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center mb-4 px-3 py-1 rounded-full text-primary bg-primary/10 backdrop-blur-sm border border-primary/20">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">AI Medical Consultation</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white">
            BreastCare Predict Medical Assistant
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Advanced AI-powered medical assistant for healthcare professionals
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-md bg-black/40 rounded-xl overflow-hidden border border-white/10 relative">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
            
            {/* Chat Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-4">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-medium">BreastCare Predict Assistant</h3>
                  <p className="text-gray-400 text-sm">Powered by multi-provider AI technology</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-8 w-8 border-white/20 bg-black/30 text-gray-400 hover:text-white hover:bg-black/50"
                onClick={() => setInput("Ask questions about breast cancer diagnosis")}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Chat messages area */}
            <div className="h-96 p-6 overflow-y-auto" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)' }}>
              {messages.length === 0 ? (
                <div className="flex mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-3 flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-black/40 backdrop-blur-md p-4 rounded-lg border border-white/10 max-w-[80%] text-gray-200">
                    <p>
                      Hello! I'm your BreastCare Predict medical assistant. I can answer questions about breast cancer detection, diagnosis, and treatment options based on the latest medical research. How can I help you today?
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                      <span>{formatTime(new Date().toISOString())}</span>
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex mb-6 ${message.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-3 flex-shrink-0">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    
                    <div className={`p-4 rounded-lg border max-w-[80%] ${
                      message.role === 'user' 
                        ? 'bg-primary/10 backdrop-blur-md border-primary/30 text-white ml-auto' 
                        : 'bg-black/40 backdrop-blur-md border-white/10 text-gray-200'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <span>{formatTime(message.timestamp)}</span>
                      </div>
                    </div>
                    
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 ml-3 flex-shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="flex mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-3 flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-black/40 backdrop-blur-md p-4 rounded-lg border border-white/10">
                    <div className="flex space-x-2">
                      <div className="bg-primary/40 w-2 h-2 rounded-full animate-pulse"></div>
                      <div className="bg-primary/40 w-2 h-2 rounded-full animate-pulse delay-100"></div>
                      <div className="bg-primary/40 w-2 h-2 rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input area */}
            <div className="p-6 border-t border-white/10">
              <form onSubmit={handleSubmit} className="flex items-center w-full">
                <Input
                  type="text"
                  placeholder="Type your medical question here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow bg-black/30 border-white/10 text-gray-200 rounded-full py-3 px-5 focus-visible:ring-primary"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  className="ml-3 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-full p-3 aspect-square"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-4 text-center">
                For medical emergencies, please call emergency services or visit your nearest hospital.
              </p>
            </div>
          </div>
          
          {/* Example questions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => {
                if (!isLoading) {
                  setInput("What are the early symptoms of breast cancer?");
                  sendMessage("What are the early symptoms of breast cancer?");
                }
              }}
              className="bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-primary/10 rounded-lg p-4 text-left text-gray-300 text-sm transition-colors"
            >
              <span className="text-primary">Ask:</span> What are the early symptoms of breast cancer?
            </button>
            
            <button 
              onClick={() => {
                if (!isLoading) {
                  setInput("How effective are mammograms for early detection?");
                  sendMessage("How effective are mammograms for early detection?");
                }
              }}
              className="bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-primary/10 rounded-lg p-4 text-left text-gray-300 text-sm transition-colors"
            >
              <span className="text-primary">Ask:</span> How effective are mammograms for early detection?
            </button>
            
            <button 
              onClick={() => {
                if (!isLoading) {
                  setInput("What are the latest treatment options?");
                  sendMessage("What are the latest treatment options?");
                }
              }}
              className="bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-primary/10 rounded-lg p-4 text-left text-gray-300 text-sm transition-colors"
            >
              <span className="text-primary">Ask:</span> What are the latest treatment options?
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
