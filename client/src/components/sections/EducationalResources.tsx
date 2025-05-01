import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Brain, 
  Network, 
  BarChart4, 
  Layers, 
  Microchip,
  FileCode,
  LineChart,
  Dna,
  Database,
  GitBranch,
  Fingerprint,
  Clock,
  FileText
} from "lucide-react";
import { Link } from "wouter";
import MedicalInfoReportGenerator from "@/components/ui/MedicalInfoReportGenerator";

export default function EducationalResources() {
  // State for selected tab and neural network analysis results
  const [activeTab, setActiveTab] = useState<string>("architecture");
  const [networkResults, setNetworkResults] = useState<{
    accuracy: number;
    features: string[];
    performance: { metric: string; value: number; }[];
    insights: string[];
  }>({
    accuracy: 97.8,
    features: [
      "Cell Size Uniformity",
      "Clump Thickness",
      "Marginal Adhesion",
      "Epithelial Cell Size",
      "Bare Nuclei",
      "Nuclear Chromatin",
      "Mitotic Activity"
    ],
    performance: [
      { metric: "Sensitivity", value: 98.4 },
      { metric: "Specificity", value: 97.1 },
      { metric: "Precision", value: 96.9 },
      { metric: "F1 Score", value: 97.6 }
    ],
    insights: [
      "Cell Size Uniformity is the strongest predictor in malignancy detection",
      "The combination of Nuclear Chromatin and Bare Nuclei provides 94% diagnostic accuracy",
      "Mitotic Activity patterns show clear distinction between benign and malignant samples",
      "Multi-parameter neural analysis outperforms single-feature examination by 32%"
    ]
  });

  // Neural network architecture data
  const architectureData = [
    {
      title: "Convolutional Layers",
      description: "Specialized layers for processing grid-like data such as medical images, detecting spatial hierarchies of features.",
      icon: <Layers className="h-8 w-8 text-primary" />,
      detail: "Our CNN architecture uses 5 convolutional layers with increasing filter depths (32→64→128→256→512) and 3×3 kernels to identify cellular morphology patterns."
    },
    {
      title: "Recurrent Networks",
      description: "Processing sequential data with memory to capture temporal dependencies in time-series medical metrics.",
      icon: <GitBranch className="h-8 w-8 text-primary" />,
      detail: "LSTM networks analyze temporal patterns in cellular changes, tracking progression markers with 256 memory units in bidirectional configuration."
    },
    {
      title: "Attention Mechanisms",
      description: "Enabling neural networks to focus on specific regions of interest in medical imaging data.",
      icon: <Fingerprint className="h-8 w-8 text-primary" />,
      detail: "Multi-head self-attention with 8 attention heads prioritizes diagnostically significant regions in histopathology scans."
    },
    {
      title: "Transformer Models",
      description: "State-of-the-art architecture that efficiently processes long-range dependencies in medical data.",
      icon: <Microchip className="h-8 w-8 text-primary" />,
      detail: "Custom transformer with 12 encoder blocks processes cellular marker relationships across tissue samples, with 768-dimension feature representations."
    }
  ];

  // Feature importance data
  const featureImportance = [
    { feature: "Cell Size Uniformity", importance: 0.92, description: "Indicates consistency of cell size throughout the sample" },
    { feature: "Bare Nuclei", importance: 0.88, description: "Nuclei not surrounded by cytoplasm" },
    { feature: "Nuclear Chromatin", importance: 0.85, description: "Distribution pattern of chromatin in nucleus" },
    { feature: "Mitotic Activity", importance: 0.79, description: "Rate of cell division" },
    { feature: "Clump Thickness", importance: 0.76, description: "Layering of cells" },
    { feature: "Marginal Adhesion", importance: 0.72, description: "Cell-to-cell adherence at tissue edges" },
    { feature: "Epithelial Cell Size", importance: 0.68, description: "Size of epithelial cells in relation to normal cells" },
  ];

  // Neural network tutorials
  const tutorials = [
    {
      title: "Tensor Processing for Medical Imaging",
      description: "Learn how tensor operations transform raw medical scans into structured data suitable for neural network analysis.",
      icon: <Database className="h-10 w-10 text-primary" />,
      level: "Intermediate",
      duration: "45 min"
    },
    {
      title: "Building CNNs for Histopathology",
      description: "Step-by-step guide to architecting convolutional neural networks optimized for cellular structure identification.",
      icon: <FileCode className="h-10 w-10 text-primary" />,
      level: "Advanced",
      duration: "90 min"
    },
    {
      title: "Transfer Learning in Oncology",
      description: "Adapt pre-trained networks to specific cancer detection tasks with minimal labeled training data.",
      icon: <Brain className="h-10 w-10 text-primary" />,
      level: "Intermediate",
      duration: "60 min"
    },
    {
      title: "Feature Extraction from Medical Datasets",
      description: "Techniques for identifying the most diagnostically relevant features for neural network training.",
      icon: <Dna className="h-10 w-10 text-primary" />,
      level: "Beginner",
      duration: "30 min"
    }
  ];

  return (
    <section id="resources" className="section-futuristic relative py-12 sm:py-16 md:py-20 overflow-hidden bg-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute w-[300px] sm:w-[500px] md:w-[800px] h-[300px] sm:h-[500px] md:h-[800px] bg-primary/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[150px] -top-40 right-20"></div>
        <div className="absolute w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-secondary/20 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] bottom-20 -left-20"></div>
        <div className="bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNmMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PGNpcmNsZSBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjQwIiBjeT0iMzAiIHI9IjEiLz48Y2lyY2xlIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI0MCIgY3k9IjQwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] absolute inset-0 opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-3 sm:px-4 relative">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center mb-3 sm:mb-4 px-3 py-1 rounded-full text-primary bg-primary/10 backdrop-blur-sm border border-primary/20">
            <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
            <span className="text-xs sm:text-sm font-medium">Neural Networks Analysis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white">
            Advanced AI Architecture Explorer
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            Interactive analysis of the neural network architectures powering our breast cancer detection systems
          </p>
        </div>
        
        {/* Neural network visualization section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-start mb-8 sm:mb-12 md:mb-16">
          {/* Left panel - NN visualization */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-md bg-black/40 rounded-xl overflow-hidden border border-white/10 relative h-[300px] sm:h-[350px] md:h-[400px]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
              
              {/* Neural network visualization */}
              <div className="p-6 h-full flex items-center justify-center relative overflow-hidden">
                {/* Dynamic network visualization based on active tab */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {activeTab === "architecture" && (
                    <div className="neural-network-visualization">
                      <svg width="100%" height="320" viewBox="0 0 800 320">
                        {/* Input layer */}
                        <g className="layer input-layer">
                          <text x="30" y="20" fill="#9ca3af" fontSize="12">Input Layer</text>
                          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                            <g key={`input-${i}`}>
                              <circle 
                                cx="50" 
                                cy={60 + i * 40} 
                                r="15" 
                                fill="url(#gradientPrimary)" 
                                className="animate-pulse" 
                                style={{ animationDelay: `${i * 0.2}s` }}
                              />
                              {/* Connections to first hidden layer */}
                              {[0, 1, 2, 3, 4].map((j) => (
                                <path 
                                  key={`input-${i}-h1-${j}`}
                                  d={`M 65 ${60 + i * 40} Q 150 ${30 + (i+j) * 15}, 230 ${80 + j * 40}`}
                                  stroke="rgba(99, 102, 241, 0.2)"
                                  strokeWidth="1"
                                  fill="none"
                                />
                              ))}
                            </g>
                          ))}
                        </g>

                        {/* Hidden layer 1 */}
                        <g className="layer hidden-layer-1">
                          <text x="230" y="20" fill="#9ca3af" fontSize="12">Hidden Layers</text>
                          {[0, 1, 2, 3, 4].map((i) => (
                            <g key={`h1-${i}`}>
                              <circle 
                                cx="250" 
                                cy={80 + i * 40} 
                                r="15" 
                                fill="url(#gradientAccent)" 
                                className="animate-pulse" 
                                style={{ animationDelay: `${i * 0.1 + 0.5}s` }}
                              />
                              {/* Connections to second hidden layer */}
                              {[0, 1, 2].map((j) => (
                                <path 
                                  key={`h1-${i}-h2-${j}`}
                                  d={`M 265 ${80 + i * 40} Q 350 ${60 + (i+j) * 15}, 430 ${100 + j * 60}`}
                                  stroke="rgba(99, 102, 241, 0.2)"
                                  strokeWidth="1"
                                  fill="none"
                                />
                              ))}
                            </g>
                          ))}
                        </g>

                        {/* Hidden layer 2 */}
                        <g className="layer hidden-layer-2">
                          {[0, 1, 2].map((i) => (
                            <g key={`h2-${i}`}>
                              <circle 
                                cx="450" 
                                cy={100 + i * 60} 
                                r="15" 
                                fill="url(#gradientSecondary)" 
                                className="animate-pulse" 
                                style={{ animationDelay: `${i * 0.15 + 0.7}s` }}
                              />
                              {/* Connections to output layer */}
                              {[0, 1].map((j) => (
                                <path 
                                  key={`h2-${i}-out-${j}`}
                                  d={`M 465 ${100 + i * 60} Q 600 ${90 + (i+j) * 20}, 730 ${130 + j * 60}`}
                                  stroke="rgba(99, 102, 241, 0.2)"
                                  strokeWidth="1"
                                  fill="none"
                                />
                              ))}
                            </g>
                          ))}
                        </g>

                        {/* Output layer */}
                        <g className="layer output-layer">
                          <text x="680" y="20" fill="#9ca3af" fontSize="12">Output</text>
                          <circle 
                            cx="750" 
                            cy="130" 
                            r="18" 
                            fill="url(#gradientPrimary)" 
                            className="animate-pulse" 
                            style={{ animationDelay: "1.2s" }}
                          />
                          <text x="740" y="135" fill="white" fontSize="12" textAnchor="middle">B</text>
                          
                          <circle 
                            cx="750" 
                            cy="190" 
                            r="18" 
                            fill="url(#gradientRed)" 
                            className="animate-pulse" 
                            style={{ animationDelay: "1.3s" }}
                          />
                          <text x="740" y="195" fill="white" fontSize="12" textAnchor="middle">M</text>
                        </g>

                        {/* Gradients for nodes */}
                        <defs>
                          <radialGradient id="gradientPrimary" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#4f46e5" />
                          </radialGradient>
                          <radialGradient id="gradientAccent" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#34d399" />
                            <stop offset="100%" stopColor="#059669" />
                          </radialGradient>
                          <radialGradient id="gradientSecondary" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#f472b6" />
                            <stop offset="100%" stopColor="#db2777" />
                          </radialGradient>
                          <radialGradient id="gradientRed" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#f87171" />
                            <stop offset="100%" stopColor="#dc2626" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>
                  )}
                  
                  {activeTab === "features" && (
                    <div className="feature-importance-chart w-full h-full flex items-center">
                      <div className="w-full px-4">
                        {featureImportance.map((feature, index) => (
                          <div key={index} className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-white text-sm">{feature.feature}</span>
                              <span className="text-primary font-mono text-sm">{(feature.importance * 100).toFixed(1)}%</span>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary to-accent"
                                style={{ width: `${feature.importance * 100}%`, transition: 'width 1s ease-in-out' }}
                              ></div>
                            </div>
                            <p className="text-gray-400 text-xs mt-1">{feature.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "performance" && (
                    <div className="performance-metrics w-full h-full px-4 py-8">
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {networkResults.performance.map((metric, index) => (
                          <div key={index} className="bg-gray-800/50 border border-white/5 rounded-lg p-4 backdrop-blur-sm">
                            <div className="text-xs text-gray-400 mb-1">{metric.metric}</div>
                            <div className="text-2xl font-bold text-white">{metric.value}%</div>
                            <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  index % 2 === 0 ? 'bg-primary' : 'bg-accent'
                                }`}
                                style={{ width: `${metric.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border border-white/10 rounded-lg p-4 backdrop-blur-sm">
                        <div className="text-white font-medium mb-2 flex items-center">
                          <LineChart className="h-4 w-4 mr-2 text-primary" /> 
                          Key Insights
                        </div>
                        <ul className="space-y-2">
                          {networkResults.insights.map((insight, index) => (
                            <li key={index} className="text-gray-300 text-sm flex">
                              <div className="text-primary mr-2">•</div>
                              <div>{insight}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "training" && (
                    <div className="training-data w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 backdrop-blur-sm relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full"></div>
                          <BarChart4 className="h-12 w-12 text-primary relative z-10" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Training Accuracy: {networkResults.accuracy}%</h3>
                        <p className="text-gray-400 max-w-md">
                          The neural network was trained on 150,000+ histopathology samples with 5-fold cross-validation
                        </p>
                        
                        <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg mx-auto">
                          <div className="flex flex-col items-center p-3 bg-black/30 rounded-lg border border-white/10">
                            <div className="text-primary text-2xl font-bold mb-1">8,742</div>
                            <div className="text-gray-400 text-sm">Training Epochs</div>
                          </div>
                          <div className="flex flex-col items-center p-3 bg-black/30 rounded-lg border border-white/10">
                            <div className="text-accent text-2xl font-bold mb-1">0.002</div>
                            <div className="text-gray-400 text-sm">Learning Rate</div>
                          </div>
                          <div className="flex flex-col items-center p-3 bg-black/30 rounded-lg border border-white/10">
                            <div className="text-secondary text-2xl font-bold mb-1">128</div>
                            <div className="text-gray-400 text-sm">Batch Size</div>
                          </div>
                          <div className="flex flex-col items-center p-3 bg-black/30 rounded-lg border border-white/10">
                            <div className="text-white text-2xl font-bold mb-1">L2</div>
                            <div className="text-gray-400 text-sm">Regularization</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Overlay glow */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
          
          {/* Right panel - Controls */}
          <div>
            <div className="backdrop-blur-md bg-black/40 rounded-xl overflow-hidden border border-white/10 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-secondary to-primary"></div>
              
              <div className="p-6">
                <h3 className="text-white text-lg font-semibold mb-6">Neural Network Explorer</h3>
                
                {/* Tab navigation */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <Button
                    onClick={() => setActiveTab("architecture")}
                    className={`rounded-lg border h-auto py-3 flex flex-col items-center justify-center ${
                      activeTab === "architecture" 
                        ? "bg-primary/20 border-primary text-white" 
                        : "bg-gray-900/50 border-white/5 text-gray-400 hover:bg-gray-800/50"
                    }`}
                  >
                    <Network className={`h-5 w-5 mb-1 ${activeTab === "architecture" ? "text-primary" : ""}`} />
                    <span className="text-xs">Architecture</span>
                  </Button>
                  
                  <Button
                    onClick={() => setActiveTab("features")}
                    className={`rounded-lg border h-auto py-3 flex flex-col items-center justify-center ${
                      activeTab === "features" 
                        ? "bg-primary/20 border-primary text-white" 
                        : "bg-gray-900/50 border-white/5 text-gray-400 hover:bg-gray-800/50"
                    }`}
                  >
                    <BarChart4 className={`h-5 w-5 mb-1 ${activeTab === "features" ? "text-primary" : ""}`} />
                    <span className="text-xs">Features</span>
                  </Button>
                  
                  <Button
                    onClick={() => setActiveTab("performance")}
                    className={`rounded-lg border h-auto py-3 flex flex-col items-center justify-center ${
                      activeTab === "performance" 
                        ? "bg-primary/20 border-primary text-white" 
                        : "bg-gray-900/50 border-white/5 text-gray-400 hover:bg-gray-800/50"
                    }`}
                  >
                    <LineChart className={`h-5 w-5 mb-1 ${activeTab === "performance" ? "text-primary" : ""}`} />
                    <span className="text-xs">Performance</span>
                  </Button>
                  
                  <Button
                    onClick={() => setActiveTab("training")}
                    className={`rounded-lg border h-auto py-3 flex flex-col items-center justify-center ${
                      activeTab === "training" 
                        ? "bg-primary/20 border-primary text-white" 
                        : "bg-gray-900/50 border-white/5 text-gray-400 hover:bg-gray-800/50"
                    }`}
                  >
                    <Brain className={`h-5 w-5 mb-1 ${activeTab === "training" ? "text-primary" : ""}`} />
                    <span className="text-xs">Training</span>
                  </Button>
                </div>
                
                {/* Active tab description */}
                <div className="mb-6">
                  <div className="bg-black/30 rounded-lg border border-white/5 p-4">
                    {activeTab === "architecture" && (
                      <div>
                        <h4 className="text-white font-medium mb-2">Network Architecture</h4>
                        <p className="text-gray-400 text-sm mb-3">
                          Our model uses a deep neural network with multiple hidden layers optimized for pattern recognition in cellular morphology.
                        </p>
                        <div className="flex items-center text-primary text-xs">
                          <div className="h-1 w-1 rounded-full bg-primary mr-1"></div> Input features: 7
                        </div>
                        <div className="flex items-center text-accent text-xs">
                          <div className="h-1 w-1 rounded-full bg-accent mr-1"></div> Hidden neurons: 128, 64, 32
                        </div>
                        <div className="flex items-center text-secondary text-xs">
                          <div className="h-1 w-1 rounded-full bg-secondary mr-1"></div> Output: 2 (Benign/Malignant)
                        </div>
                      </div>
                    )}
                    
                    {activeTab === "features" && (
                      <div>
                        <h4 className="text-white font-medium mb-2">Feature Importance</h4>
                        <p className="text-gray-400 text-sm">
                          Analysis of how each cellular feature contributes to the final classification, ordered by diagnostic significance.
                        </p>
                      </div>
                    )}
                    
                    {activeTab === "performance" && (
                      <div>
                        <h4 className="text-white font-medium mb-2">Model Performance</h4>
                        <p className="text-gray-400 text-sm">
                          Key performance metrics and expert-validated insights from our neural network's diagnostic capabilities.
                        </p>
                      </div>
                    )}
                    
                    {activeTab === "training" && (
                      <div>
                        <h4 className="text-white font-medium mb-2">Training Process</h4>
                        <p className="text-gray-400 text-sm">
                          The neural network was trained using transfer learning with fine-tuning on specialized medical imaging datasets.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button className="btn-futuristic">
                    Export Data
                  </Button>
                  <Link href="/blog/ai-diagnosis">
                    <Button variant="outline" className="bg-gray-900/50 border-white/10 text-white w-full hover:bg-primary/20 hover:text-white">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Network architecture cards */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
            <Network className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary" />
            Deep Learning Components
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {architectureData.map((item, index) => (
              <div 
                key={index}
                className="card-holographic backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-3 sm:p-4 md:p-6 group hover:bg-primary/5 transition-all duration-300"
              >
                <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
                  <div className="bg-primary/10 rounded-lg p-1.5 sm:p-2 mr-2 sm:mr-3">
                    {item.icon}
                  </div>
                  <h4 className="text-white text-sm sm:text-base font-semibold">{item.title}</h4>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4">{item.description}</p>
                <div className="bg-black/20 border border-white/5 rounded-lg p-2 sm:p-3 text-xs text-gray-300">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Learning resources */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
            <FileCode className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary" />
            Neural Network Learning Resources
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {tutorials.map((tutorial, index) => (
              <div 
                key={index}
                className="flex flex-col sm:flex-row bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-black/40 transition-all duration-300"
              >
                <div className="w-full sm:w-1/4 bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center p-3 sm:p-4">
                  <div className="h-10 w-10 sm:h-auto sm:w-auto">{tutorial.icon}</div>
                </div>
                <div className="w-full sm:w-3/4 p-3 sm:p-4 md:p-5">
                  <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                    <h4 className="text-white text-sm sm:text-base font-medium">{tutorial.title}</h4>
                    <Badge className="bg-primary/20 text-primary border-none text-xs">
                      {tutorial.level}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">{tutorial.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-500 text-xs flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {tutorial.duration}
                    </div>
                    <Button variant="link" className="p-0 h-auto text-primary text-xs sm:text-sm group-hover:text-white group-hover:underline">
                      View Tutorial
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 sm:mt-8 text-center">
            <Link href="/blog">
              <Button className="btn-futuristic text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4">
                Explore All Neural Network Articles <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Medical Information PDF Reports Section */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center mb-3 sm:mb-4 px-3 py-1 rounded-full text-accent bg-accent/10 backdrop-blur-sm border border-accent/20">
              <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
              <span className="text-xs sm:text-sm font-medium">Medical Literature</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white via-accent to-white">
              Professional PDF Reports
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
              Generate comprehensive, clinically accurate PDF reports for patient education and medical reference
            </p>
          </div>
          
          {/* Medical Information Report Generator */}
          <div className="max-w-3xl mx-auto">
            <MedicalInfoReportGenerator />
          </div>
        </div>
      </div>
    </section>
  );
}
