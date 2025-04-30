import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Microscope, RotateCcw, Zap, Activity, BrainCircuit, ScanSearch } from "lucide-react";
import { PredictionParams } from "@/lib/predictionModel";

interface PredictionFormProps {
  params: PredictionParams;
  setParams: (params: PredictionParams) => void;
  onSubmit: () => void;
  onReset: () => void;
  isLoading: boolean;
}

export default function PredictionForm({
  params,
  setParams,
  onSubmit,
  onReset,
  isLoading
}: PredictionFormProps) {
  const handleSliderChange = (value: number[], name: keyof PredictionParams) => {
    setParams({
      ...params,
      [name]: value[0]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const parameterDefinitions = {
    cellSize: {
      label: "Mean Cell Size",
      description: "Average size of cell nuclei measured in microns",
      min: 10,
      max: 30,
      step: 0.1,
      format: (value: number) => `${value.toFixed(1)} μm`
    },
    cellShape: {
      label: "Cell Shape Uniformity",
      description: "Measure of consistency in cell shape (1-10)",
      min: 1,
      max: 10,
      step: 1,
      format: (value: number) => `${value}`
    },
    marginalAdhesion: {
      label: "Marginal Adhesion",
      description: "Measure of how much cells adhere to each other at margins",
      min: 1,
      max: 10,
      step: 1,
      format: (value: number) => `${value}`
    },
    epithelialSize: {
      label: "Epithelial Cell Size",
      description: "Size of epithelial cells in the sample",
      min: 1,
      max: 10,
      step: 1,
      format: (value: number) => `${value}`
    },
    bareNuclei: {
      label: "Bare Nuclei",
      description: "Presence of bare nuclei (1-10)",
      min: 1,
      max: 10,
      step: 1,
      format: (value: number) => `${value}`
    },
    blandChromatin: {
      label: "Bland Chromatin",
      description: "Assessment of chromatin uniformity (1-10)",
      min: 1,
      max: 10,
      step: 1,
      format: (value: number) => `${value}`
    },
    normalNucleoli: {
      label: "Normal Nucleoli",
      description: "Assessment of normal nucleoli (1-10)",
      min: 1,
      max: 10,
      step: 1,
      format: (value: number) => `${value}`
    },
    mitoses: {
      label: "Mitoses",
      description: "Count of mitoses per high power field (1-10)",
      min: 1,
      max: 10,
      step: 1,
      format: (value: number) => `${value}`
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-holographic relative overflow-hidden p-4 sm:p-5 bg-black/50 text-white rounded-xl backdrop-blur-md border border-white/10">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-primary rounded-full blur-[80px] sm:blur-[100px] -top-20 -right-20"></div>
        <div className="absolute w-48 sm:w-64 h-48 sm:h-64 bg-accent rounded-full blur-[60px] sm:blur-[80px] bottom-0 left-20"></div>
        <div className="bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNmMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PGNpcmNsZSBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjQwIiBjeT0iMzAiIHI9IjEiLz48Y2lyY2xlIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI0MCIgY3k9IjQwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] absolute inset-0 opacity-10"></div>
      </div>
      
      {/* Header */}
      <div className="mb-4 sm:mb-6 relative">
        <div className="flex items-center mb-2">
          <div className="w-1 sm:w-1.5 h-6 sm:h-7 bg-primary rounded-sm mr-2 sm:mr-3 animate-pulse"></div>
          <h3 className="text-base sm:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-accent">
            Diagnostic Parameter Configuration
          </h3>
        </div>
        <p className="text-gray-400 ml-3 sm:ml-5 text-xs sm:text-sm max-w-2xl">
          Adjust biomarkers using advanced neural scanning technology to analyze cellular samples with quantum precision
        </p>
      </div>
      
      {/* Parameters Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {Object.entries(parameterDefinitions).map(([key, def]) => {
          const paramKey = key as keyof PredictionParams;
          return (
            <div key={key} className="parameter-input backdrop-blur-sm bg-black/30 p-2 sm:p-3 rounded-lg border border-white/5 hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-center mb-1.5 sm:mb-2">
                <div className="flex items-center">
                  {key === "cellSize" && <BrainCircuit className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mr-1.5 sm:mr-2" />}
                  {key === "cellShape" && <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent mr-1.5 sm:mr-2" />}
                  {key === "mitoses" && <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-secondary mr-1.5 sm:mr-2" />}
                  {!["cellSize", "cellShape", "mitoses"].includes(key) && <ScanSearch className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary/80 mr-1.5 sm:mr-2" />}
                  <Label htmlFor={key} className="text-gray-300 text-xs sm:text-sm font-medium">{def.label}</Label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-gray-400 ml-1.5 bg-white/5 rounded-full p-0.5 cursor-help hover:bg-white/10 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="sm:w-3.5 sm:h-3.5"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 border-primary text-white backdrop-blur-md text-xs sm:text-sm">
                      <p>{def.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <Slider
                  id={key}
                  min={def.min}
                  max={def.max}
                  step={def.step}
                  value={[params[paramKey]]}
                  onValueChange={(value) => handleSliderChange(value, paramKey)}
                  className="flex-grow"
                  disabled={isLoading}
                />
                <span className="font-mono bg-black/50 backdrop-blur-sm border border-white/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-primary min-w-[3rem] sm:min-w-[3.8rem] text-center text-xs sm:text-sm group-hover:border-primary/30 transition-colors">
                  {def.format(params[paramKey])}
                </span>
              </div>
              
              {/* Progress tracker */}
              <div className="mt-1 sm:mt-1.5 h-0.5 w-full bg-black/50 relative overflow-hidden rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-primary/50 to-primary absolute top-0 left-0 transition-all duration-300"
                  style={{ 
                    width: `${((params[paramKey] - def.min) / (def.max - def.min)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 sm:mt-8 flex flex-col xs:flex-row items-center gap-3 xs:justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="bg-black/50 backdrop-blur-sm border-white/20 text-gray-300 hover:bg-white/10 hover:text-white transition-all text-xs sm:text-sm w-full xs:w-auto py-1.5"
          disabled={isLoading}
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Reset Parameters
        </Button>
        
        <Button
          type="submit"
          className="btn-futuristic relative group w-full xs:w-auto py-1.5"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center text-xs sm:text-sm">
              <Activity className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 animate-pulse" /> Processing Sample...
            </span>
          ) : (
            <span className="flex items-center relative overflow-hidden text-xs sm:text-sm">
              <Microscope className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Analyze Specimen
              <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
