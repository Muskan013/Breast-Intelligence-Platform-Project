import { Brain, Activity, Database, Network, Atom, Microscope } from "lucide-react";

export default function FeatureHighlights() {
  const features = [
    {
      icon: <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
      title: "Neural Network Analysis",
      description: "Our ML model analyzes cellular morphology using 8 biomarkers trained on 150,000+ verified histopathology samples.",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: <Microscope className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />,
      title: "Medical Expert System",
      description: "Developed with leading oncologists and pathologists to ensure diagnostic relevance and clinical accuracy.",
      gradient: "from-accent/20 to-accent/5"
    },
    {
      icon: <Network className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />,
      title: "Quantum Processing",
      description: "Advanced algorithmic models process specimen data in milliseconds with unprecedented computational precision.",
      gradient: "from-secondary/20 to-secondary/5"
    },
    {
      icon: <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
      title: "Real-time Analysis",
      description: "Instant risk assessment with confidence scoring and probability distribution analysis for immediate insights.",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: <Database className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />,
      title: "Research Integration",
      description: "System continuously incorporates the latest oncology research and evolving diagnostic frameworks.",
      gradient: "from-accent/20 to-accent/5"
    },
    {
      icon: <Atom className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />,
      title: "Multimodal Analysis",
      description: "Process multiple input formats including histopathology images, cellular measurements, and clinical data.",
      gradient: "from-secondary/20 to-secondary/5"
    }
  ];

  return (
    <section id="features" className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-gray-50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/20 rounded-full blur-[80px] sm:blur-[100px] top-0 left-0"></div>
        <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-secondary/20 rounded-full blur-[80px] sm:blur-[100px] bottom-0 right-0"></div>
      </div>
      
      <div className="container mx-auto px-3 sm:px-4 relative">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center mb-3 sm:mb-4 px-3 py-1 rounded-full text-primary bg-primary/10 backdrop-blur-sm border border-primary/20">
            <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
            <span className="text-xs sm:text-sm font-medium">Advanced Analysis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-primary to-gray-900">
            Quantum Neural Processing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            Our diagnostic system combines advanced artificial intelligence with medical expertise for unprecedented accuracy
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card-holographic p-4 sm:p-5 md:p-6 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20"
            >
              <div className={`bg-gradient-to-br ${feature.gradient} rounded-lg p-2 sm:p-3 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
