import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Microscope, RotateCcw } from "lucide-react";
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
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(parameterDefinitions).map(([key, def]) => {
          const paramKey = key as keyof PredictionParams;
          return (
            <div key={key} className="parameter-input">
              <div className="flex items-center mb-2">
                <Label htmlFor={key} className="text-gray-700 font-medium">{def.label}</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400 ml-1 cursor-help"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{def.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-4">
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
                <span className="font-mono text-gray-700 min-w-[3.5rem] text-right">
                  {def.format(params[paramKey])}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="text-gray-600 bg-gray-100 hover:bg-gray-200"
          disabled={isLoading}
        >
          <RotateCcw className="mr-1 h-4 w-4" /> Reset
        </Button>
        <Button
          type="submit"
          className="bg-primary-500 hover:bg-primary-600 text-white"
          disabled={isLoading}
        >
          <Microscope className="mr-2 h-4 w-4" /> Generate Prediction
        </Button>
      </div>
    </form>
  );
}
