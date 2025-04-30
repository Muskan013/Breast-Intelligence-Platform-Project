import { Button } from "@/components/ui/button";
import { Microscope, Bot, ChevronRight, BrainCircuit, ShieldCheck, LightbulbIcon } from "lucide-react";

export default function HeroSection() {
  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-black text-white py-20 overflow-hidden section-futuristic">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute w-96 h-96 bg-primary rounded-full blur-[100px] -top-10 -left-10"></div>
        <div className="absolute w-96 h-96 bg-accent rounded-full blur-[100px] bottom-0 right-0"></div>
        <div className="absolute h-96 w-96 bg-secondary rounded-full blur-[100px] bottom-20 left-1/3"></div>
      </div>
      
      {/* Abstract pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNmMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PGNpcmNsZSBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjQwIiBjeT0iMzAiIHI9IjEiLz48Y2lyY2xlIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI0MCIgY3k9IjQwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <div className="inline-flex items-center bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full text-primary-400 text-sm font-medium mb-6 border border-primary/30">
              <span className="animate-pulse mr-2 bg-primary h-2 w-2 rounded-full"></span>
              Advanced Neural Network Technology
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              <span className="block">Next-Gen</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
                Medical Diagnostics
              </span>
              <span className="block">Powered by AI</span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              Our revolutionary AI platform leverages deep learning algorithms to assist in early cancer detection with unprecedented accuracy, enhancing clinical decision-making.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="btn-futuristic group"
                onClick={() => handleScrollTo("prediction")}
              >
                <Microscope className="mr-2 h-5 w-5" /> 
                Start Analysis <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="backdrop-blur-sm bg-white/5 border-primary hover:bg-white/10 text-white"
                onClick={() => handleScrollTo("assistant")}
              >
                <div className="mr-2 h-5 w-5 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <span className="text-xs font-bold">AI</span>
                </div>
                Gemini Assistant
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-lg mb-2">
                  <BrainCircuit className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs text-center">Neural Networks</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-secondary to-accent p-2 rounded-lg mb-2">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs text-center">99.7% Accuracy</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-accent to-primary p-2 rounded-lg mb-2">
                  <LightbulbIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs text-center">Smart Analysis</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-2xl opacity-20 rounded-full transform -translate-x-1/4 -translate-y-1/4"></div>
            <div className="relative card-holographic rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Medical professionals using advanced diagnostics"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-4 border border-white/10">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
                  <div className="text-xs text-primary">LIVE DATA PROCESSING</div>
                </div>
                <div className="text-sm mt-1 font-mono">Analyzing cellular patterns with quantum precision</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
