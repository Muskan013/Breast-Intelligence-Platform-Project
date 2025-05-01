import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/useChat";
import { Send, Bot, User, RefreshCw, MessageSquare, Mic, MicOff, Volume2 } from "lucide-react";
import BackButton from "@/components/ui/BackButton";

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function AIAssistantChat() {
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setInput(transcript);
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current?.start();
        }
      };
    }
    
    return () => {
      recognitionRef.current?.stop();
    };
  }, [isListening]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      
      // If there's input after stopping, submit it
      if (input.trim()) {
        sendMessage(input);
        setInput("");
      }
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
        console.error('Speech recognition error:', error);
      }
    }
  };
  
  // Text-to-speech functionality
  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95; // Slightly slower than default
      utterance.pitch = 1.0;
      
      // Use a female voice if available
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('female'));
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      setIsSpeaking(true);
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

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

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="mb-4 sm:mb-6 flex justify-center">
          <BackButton to="/" label="Back to Home" variant="outline" className="bg-black/30 text-white hover:bg-black/50 border-white/10" />
        </div>
        
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center mb-4 px-3 py-1 rounded-full text-primary bg-primary/10 backdrop-blur-sm border border-primary/20">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">AI Medical Consultation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white">
            BreastCare Predict Medical Assistant
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg px-2">
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
            <div className="h-64 sm:h-80 md:h-96 p-4 sm:p-6 overflow-y-auto" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)' }}>
              {messages.length === 0 ? (
                <div className="flex mb-6">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center text-white mr-2 sm:mr-3 flex-shrink-0">
                    <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div className="bg-black/40 backdrop-blur-md p-3 sm:p-4 rounded-lg border border-white/10 max-w-[85%] sm:max-w-[80%] text-gray-200">
                    <p className="text-sm sm:text-base">
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
                    className={`flex mb-4 sm:mb-6 ${message.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center text-white mr-2 sm:mr-3 flex-shrink-0">
                        <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                      </div>
                    )}
                    
                    <div className={`p-3 sm:p-4 rounded-lg border max-w-[85%] sm:max-w-[80%] ${
                      message.role === 'user' 
                        ? 'bg-primary/10 backdrop-blur-md border-primary/30 text-white ml-auto' 
                        : 'bg-black/40 backdrop-blur-md border-white/10 text-gray-200'
                    }`}>
                      <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <span>{formatTime(message.timestamp)}</span>
                      </div>
                    </div>
                    
                    {message.role === 'user' && (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 ml-2 sm:ml-3 flex-shrink-0">
                        <User className="h-3 w-3 sm:h-4 sm:w-4" />
                      </div>
                    )}
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="flex mb-4 sm:mb-6">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center text-white mr-2 sm:mr-3 flex-shrink-0">
                    <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div className="bg-black/40 backdrop-blur-md p-3 sm:p-4 rounded-lg border border-white/10">
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
            <div className="p-3 sm:p-4 md:p-6 border-t border-white/10">
              <form onSubmit={handleSubmit} className="flex items-center w-full">
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder={isListening ? "Listening..." : "Type your question..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className={`w-full bg-black/30 border-white/10 text-gray-200 rounded-full py-2 md:py-3 px-4 md:px-5 text-sm sm:text-base focus-visible:ring-primary ${isListening ? 'pr-10 sm:pr-12 border-primary' : ''}`}
                    disabled={isLoading}
                  />
                  {isListening && (
                    <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                      <div className="flex space-x-1">
                        <div className="bg-primary w-1 h-2 sm:h-3 animate-pulse" style={{ animationDuration: '0.8s' }}></div>
                        <div className="bg-primary w-1 h-3 sm:h-4 animate-pulse" style={{ animationDuration: '1s' }}></div>
                        <div className="bg-primary w-1 h-1.5 sm:h-2 animate-pulse" style={{ animationDuration: '0.6s' }}></div>
                        <div className="bg-primary w-1 h-2 sm:h-3 animate-pulse" style={{ animationDuration: '0.7s' }}></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Speech recognition button */}
                <Button 
                  type="button"
                  className={`ml-1.5 sm:ml-2 ${isListening 
                    ? 'bg-primary hover:bg-primary/90' 
                    : 'bg-gray-700 hover:bg-gray-600'} text-white rounded-full p-2 sm:p-3 aspect-square`}
                  onClick={toggleListening}
                  title={isListening ? "Stop listening" : "Start voice input"}
                >
                  {isListening ? <MicOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Mic className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                </Button>
                
                {/* Send button */}
                <Button 
                  type="submit" 
                  className="ml-1.5 sm:ml-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-full p-2 sm:p-3 aspect-square"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </form>
              
              {/* Voice controls for assistant messages */}
              {messages.length > 0 && (
                <div className="flex justify-center mt-3 space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={`text-xs px-3 py-1 h-auto rounded-full ${isSpeaking ? 'bg-primary/20 text-primary' : 'bg-black/30 text-gray-400'}`}
                    onClick={() => {
                      const lastAssistantMessage = messages
                        .filter(m => m.role === 'assistant')
                        .pop();
                      
                      if (lastAssistantMessage) {
                        isSpeaking ? stopSpeaking() : speakMessage(lastAssistantMessage.content);
                      }
                    }}
                  >
                    <Volume2 className="h-3 w-3 mr-1" />
                    {isSpeaking ? "Stop speaking" : "Speak last response"}
                  </Button>
                </div>
              )}
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                For medical emergencies, please call emergency services or visit your nearest hospital.
              </p>
            </div>
          </div>
          
          {/* Example questions */}
          <div className="my-8">
            <h3 className="text-white text-lg mb-4 font-medium text-center">Common Questions About Breast Cancer</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {/* Category: Symptoms */}
              <div>
                <h4 className="text-primary mb-3 text-sm font-medium">Symptoms & Detection</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      if (!isLoading) {
                        setInput("What are the early symptoms of breast cancer?");
                        sendMessage("What are the early symptoms of breast cancer?");
                      }
                    }}
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-primary/10 rounded-lg p-3 text-left text-gray-300 text-sm transition-colors"
                  >
                    <span className="text-primary mr-1 opacity-70">•</span> Early symptoms of breast cancer
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (!isLoading) {
                        setInput("How effective are mammograms for early detection?");
                        sendMessage("How effective are mammograms for early detection?");
                      }
                    }}
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-primary/10 rounded-lg p-3 text-left text-gray-300 text-sm transition-colors"
                  >
                    <span className="text-primary mr-1 opacity-70">•</span> Effectiveness of mammograms
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (!isLoading) {
                        setInput("When should I start getting breast cancer screenings?");
                        sendMessage("When should I start getting breast cancer screenings?");
                      }
                    }}
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-primary/10 rounded-lg p-3 text-left text-gray-300 text-sm transition-colors"
                  >
                    <span className="text-primary mr-1 opacity-70">•</span> When to start breast cancer screenings
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (!isLoading) {
                        setInput("How do you perform a breast self-examination?");
                        sendMessage("How do you perform a breast self-examination?");
                      }
                    }}
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-primary/10 rounded-lg p-3 text-left text-gray-300 text-sm transition-colors"
                  >
                    <span className="text-primary mr-1 opacity-70">•</span> Breast self-examination guide
                  </button>
                </div>
              </div>
              
              {/* Category: Risk & Prevention */}
              <div>
                <h4 className="text-primary mb-3 text-sm font-medium">Risk & Prevention</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      if (!isLoading) {
                        setInput("What are the risk factors for breast cancer?");
                        sendMessage("What are the risk factors for breast cancer?");
                      }
                    }}
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-primary/10 rounded-lg p-3 text-left text-gray-300 text-sm transition-colors"
                  >
                    <span className="text-primary mr-1 opacity-70">•</span> Breast cancer risk factors
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (!isLoading) {
                        setInput("Does family history increase breast cancer risk?");
                        sendMessage("Does family history increase breast cancer risk?");
                      }
                    }}
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-primary/10 rounded-lg p-3 text-left text-gray-300 text-sm transition-colors"
                  >
                    <span className="text-primary mr-1 opacity-70">•</span> Family history and genetic risk
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (!isLoading) {
                        setInput("How can I reduce my risk of breast cancer?");
                        sendMessage("How can I reduce my risk of breast cancer?");
                      }
                    }}
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-primary/10 rounded-lg p-3 text-left text-gray-300 text-sm transition-colors"
                  >
                    <span className="text-primary mr-1 opacity-70">•</span> Ways to reduce breast cancer risk
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (!isLoading) {
                        setInput("Should I get genetic testing for breast cancer?");
                        sendMessage("Should I get genetic testing for breast cancer?");
                      }
                    }}
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-primary/10 rounded-lg p-3 text-left text-gray-300 text-sm transition-colors"
                  >
                    <span className="text-primary mr-1 opacity-70">•</span> Genetic testing considerations
                  </button>
                </div>
              </div>
              
              {/* Category: Treatment & Research */}
              <div>
                <h4 className="text-primary mb-3 text-sm font-medium">Treatment & Research</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      if (!isLoading) {
                        setInput("What are the latest treatment options for breast cancer?");
                        sendMessage("What are the latest treatment options for breast cancer?");
                      }
                    }}
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-primary/10 rounded-lg p-3 text-left text-gray-300 text-sm transition-colors"
                  >
                    <span className="text-primary mr-1 opacity-70">•</span> Latest breast cancer treatments
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (!isLoading) {
                        setInput("What's the difference between lumpectomy and mastectomy?");
                        sendMessage("What's the difference between lumpectomy and mastectomy?");
                      }
                    }}
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-primary/10 rounded-lg p-3 text-left text-gray-300 text-sm transition-colors"
                  >
                    <span className="text-primary mr-1 opacity-70">•</span> Lumpectomy vs. mastectomy
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (!isLoading) {
                        setInput("What are the side effects of breast cancer treatments?");
                        sendMessage("What are the side effects of breast cancer treatments?");
                      }
                    }}
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-primary/10 rounded-lg p-3 text-left text-gray-300 text-sm transition-colors"
                  >
                    <span className="text-primary mr-1 opacity-70">•</span> Treatment side effects
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (!isLoading) {
                        setInput("What is the survival rate for breast cancer?");
                        sendMessage("What is the survival rate for breast cancer?");
                      }
                    }}
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-primary/10 rounded-lg p-3 text-left text-gray-300 text-sm transition-colors"
                  >
                    <span className="text-primary mr-1 opacity-70">•</span> Breast cancer survival rates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}