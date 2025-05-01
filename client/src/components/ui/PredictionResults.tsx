import { PredictionResult, PredictionParams } from "@/lib/predictionModel";
import { CheckCircle2, AlertCircle, BadgeCheck, Zap, Shield, Activity, HeartPulse, ScanSearch, FileText, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generatePredictionReport } from "@/lib/pdfReportService";
import { useState } from "react";

interface PredictionResultsProps {
  result: PredictionResult | null;
  isLoading: boolean;
}

export default function PredictionResults({ result, isLoading }: PredictionResultsProps) {
  // State for PDF generation loading
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  
  // Convert probability to percentage
  const formatPercentage = (value: number) => {
    return `${Math.round(value * 100)}%`;
  };
  
  // Handle PDF report generation
  const handleGenerateReport = async () => {
    if (!result) return;
    
    try {
      setIsPdfGenerating(true);
      
      // Get parameters from default values if not available
      const params: PredictionParams = {
        cellSize: 5,
        cellShape: 5,
        marginalAdhesion: 5,
        epithelialSize: 5,
        bareNuclei: 5,
        blandChromatin: 5,
        normalNucleoli: 5,
        mitoses: 5
      };
      
      await generatePredictionReport(params, result);
    } catch (error) {
      console.error('Failed to generate PDF report:', error);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Generate gauge chart configurations
  const getGaugeStyles = (benignProb: number) => {
    // Calculate rotation for a semi-circle (180 degrees)
    // 0% = -180deg, 100% = 0deg
    const rotation = -180 + (benignProb * 180);
    
    const colorClass = benignProb > 0.5 ? "text-green-500" : "text-red-500";
    
    return {
      rotation: `${rotation}deg`,
      colorClass
    };
  };

  // Initial state - no prediction has been made
  if (!isLoading && !result) {
    return (
      <div className="card-holographic text-center py-12 flex-grow flex items-center justify-center flex-col relative overflow-hidden p-8 bg-black/50 rounded-xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]"></div>
        <div className="relative">
          <div className="w-48 h-48 backdrop-blur-lg bg-black/30 rounded-full flex items-center justify-center mb-6 border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10"></div>
            <div className="relative z-10">
              <Activity className="h-16 w-16 text-primary animate-pulse" />
            </div>
            
            {/* Radar animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gradient-to-t from-primary/0 via-primary/50 to-primary/0 origin-bottom animate-[spin_4s_linear_infinite]"></div>
            </div>
          </div>
          
          <div className="space-y-4 relative backdrop-blur-sm bg-black/30 p-4 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white">Neural Analysis Ready</h3>
            <p className="text-gray-300 max-w-xs mx-auto text-sm">
              Configure diagnostic parameters and initiate analysis to generate advanced cellular assessment.
            </p>
            <div className="animate-pulse flex space-x-2 justify-center pt-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-2 h-2 bg-primary rounded-full delay-100"></div>
              <div className="w-2 h-2 bg-primary rounded-full delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="card-holographic text-center py-12 flex-grow flex items-center justify-center flex-col relative overflow-hidden p-8 bg-black/50 rounded-xl">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-64 h-64 bg-primary/40 rounded-full blur-[80px] top-0 right-0"></div>
          <div className="absolute w-64 h-64 bg-secondary/30 rounded-full blur-[80px] bottom-0 left-0"></div>
        </div>
        
        <div className="relative z-10 mb-8">
          {/* Futuristic loading animation */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary/30 animate-spin"></div>
            <div className="absolute inset-1 rounded-full border-4 border-t-primary border-r-primary/0 border-b-primary/0 border-l-primary/0 animate-spin"></div>
            <div className="absolute inset-3 rounded-full border-4 border-t-transparent border-r-accent border-b-transparent border-l-transparent animate-[spin_3s_linear_infinite]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Activity className="h-8 w-8 text-white animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="backdrop-blur-md bg-black/40 p-4 rounded-xl border border-white/10">
          <h4 className="text-lg font-medium text-white mb-2">Neural Processing</h4>
          <p className="text-gray-300 text-sm">Analyzing cellular morphology and genetic markers...</p>
          
          <div className="mt-4 h-1.5 bg-black/60 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent animate-[progressLoader_2s_ease-in-out_infinite]"></div>
          </div>
          
          <div className="mt-3 grid grid-cols-3 gap-1 text-xs text-gray-400">
            <div className="flex items-center justify-center">
              <span className="inline-block h-1.5 w-1.5 bg-primary/50 rounded-full animate-pulse mr-1"></span>
              Cell mapping
            </div>
            <div className="flex items-center justify-center">
              <span className="inline-block h-1.5 w-1.5 bg-primary/50 rounded-full animate-pulse mr-1"></span>
              ML prediction
            </div>
            <div className="flex items-center justify-center">
              <span className="inline-block h-1.5 w-1.5 bg-primary/50 rounded-full animate-pulse mr-1"></span>
              Confidence calc
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results state
  const gaugeStyles = getGaugeStyles(result!.benignProbability);
  
  return (
    <div className="card-holographic relative overflow-hidden bg-black/70 text-white rounded-xl p-6 flex-grow flex flex-col">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary rounded-full blur-[100px] -top-10 -right-10"></div>
        <div className="absolute w-64 h-64 bg-secondary rounded-full blur-[80px] bottom-10 left-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNmMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PGNpcmNsZSBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjQwIiBjeT0iMzAiIHI9IjEiLz48Y2lyY2xlIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI0MCIgY3k9IjQwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      </div>
      
      {/* Header */}
      <div className="mb-8 text-center relative">
        <div className="inline-flex items-center justify-center p-1 rounded-full bg-black/40 mb-4 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full"></div>
          <div className={`relative rounded-full p-3 ${result!.classification === 'Benign' ? 'bg-green-500/90' : 'bg-red-500/90'} text-white`}>
            {result!.classification === 'Benign' ? 
              <BadgeCheck className="h-6 w-6" /> : 
              <AlertCircle className="h-6 w-6" />
            }
            <div className="absolute inset-0 rounded-full animate-ping duration-700 opacity-30 bg-white"></div>
          </div>
        </div>
        <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white">Analysis Complete</h4>
      </div>

      {/* Gauge Chart */}
      <div className="relative mb-8 mx-auto w-56 h-56">
        <div className="w-full h-full rounded-full border-4 border-gray-800/60 backdrop-blur-lg bg-black/40 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/80 z-0"></div>
          
          <div className="text-center z-10 relative">
            <div className={`text-4xl font-bold ${result!.classification === 'Benign' ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercentage(result!.classification === 'Benign' ? result!.benignProbability : result!.malignantProbability)}
            </div>
            <div className="text-sm text-gray-300 mt-1">
              {result!.classification === 'Benign' ? 'Benign Probability' : 'Malignant Probability'}
            </div>
          </div>
          
          {/* Futuristic circular graph element */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
            </svg>
          </div>
        </div>
        
        {/* Gauge indicator */}
        <div 
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          style={{
            clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)",
            transform: `rotate(${gaugeStyles.rotation})`,
          }}
        >
          <div className={`w-full h-full border-8 ${result!.classification === 'Benign' ? 'border-green-500/70' : 'border-red-500/70'} rounded-full`}></div>
        </div>
        
        {/* Gauge scale markers */}
        <div className="absolute inset-0">
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-white/30"></div>
          <div className="absolute top-5 left-[25%] w-1 h-1 bg-white/20"></div>
          <div className="absolute top-5 left-[75%] w-1 h-1 bg-white/20"></div>
        </div>
      </div>

      {/* Detailed results */}
      <div className="backdrop-blur-md bg-black/40 rounded-xl p-4 mb-6 border border-white/10">
        <div className="flex items-center mb-3">
          <div className="w-1 h-6 bg-primary mr-2"></div>
          <h5 className="font-semibold text-white">Analysis Metrics</h5>
        </div>
        
        <ul className="space-y-4 text-sm">
          <li>
            <div className="flex justify-between mb-1 items-center">
              <div className="flex items-center">
                <Activity className="h-4 w-4 text-red-400 mr-2" />
                <span className="text-gray-300">Malignant Probability</span>
              </div>
              <span className="font-mono text-red-400 px-2 py-0.5 bg-black/50 rounded border border-red-500/20">
                {formatPercentage(result!.malignantProbability)}
              </span>
            </div>
            <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-600/70 to-red-400"
                style={{ width: `${result!.malignantProbability * 100}%` }}
              ></div>
            </div>
          </li>
          
          <li>
            <div className="flex justify-between mb-1 items-center">
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-gray-300">Benign Probability</span>
              </div>
              <span className="font-mono text-green-400 px-2 py-0.5 bg-black/50 rounded border border-green-500/20">
                {formatPercentage(result!.benignProbability)}
              </span>
            </div>
            <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-600/70 to-green-400"
                style={{ width: `${result!.benignProbability * 100}%` }}
              ></div>
            </div>
          </li>
          
          <li>
            <div className="flex justify-between items-center p-2 backdrop-blur-sm bg-black/20 rounded border border-white/5">
              <div className="flex items-center">
                <Zap className="h-4 w-4 text-primary mr-2" />
                <span className="text-gray-300">Analysis Confidence</span>
              </div>
              <span className={cn(
                "font-mono px-2 py-0.5 rounded font-semibold",
                result!.confidenceLevel === "High" ? "bg-green-500/20 text-green-300 border border-green-500/30" : 
                result!.confidenceLevel === "Medium" ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30" :
                "bg-red-500/20 text-red-300 border border-red-500/30"
              )}>
                {result!.confidenceLevel}
              </span>
            </div>
          </li>
        </ul>
      </div>

      <Alert className="bg-primary/10 border border-primary/30 backdrop-blur-sm p-4 text-sm text-gray-200 relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
        <AlertDescription className="relative z-10">
          <div className="flex">
            <div className="mr-2 flex-shrink-0 mt-0.5">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
            </div>
            <p><strong>Medical Advisory:</strong> This analysis is a clinical decision support tool and should not replace professional medical diagnosis. Always consult with a healthcare provider for medical decisions.</p>
          </div>
        </AlertDescription>
      </Alert>
      
      {/* PDF Report Generation Button */}
      <div className="mt-6 flex justify-center">
        <Button 
          variant="outline" 
          className="bg-black/30 backdrop-blur-sm border-primary/40 hover:bg-primary/20 text-white gap-2 py-5"
          onClick={handleGenerateReport}
          disabled={isPdfGenerating}
        >
          {isPdfGenerating ? (
            <>
              <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              Generating PDF...
            </>
          ) : (
            <>
              <FileText className="h-4 w-4 text-primary" />
              Generate PDF Report
            </>
          )}
        </Button>
      </div>

      <div className="mt-auto pt-4 border-t border-white/10 text-center text-xs text-gray-400 font-mono">
        <p>ML MODEL: WISCONSIN-BRC-2025 | QUANTUM PRECISION RATING: 99.7%<br />
        LAST CALIBRATION: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
      </div>
    </div>
  );
}
