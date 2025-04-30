import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  DEFAULT_PARAMS, 
  PredictionParams, 
  PredictionResult,
  makePrediction
} from "@/lib/predictionModel";

export function usePrediction() {
  const [params, setParams] = useState<PredictionParams>({ ...DEFAULT_PARAMS });
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generatePrediction = async () => {
    setIsLoading(true);
    
    try {
      const prediction = await makePrediction(params);
      setResult(prediction);
    } catch (error) {
      console.error("Error generating prediction:", error);
      toast({
        title: "Prediction Error",
        description: "There was a problem generating the prediction. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetParams = () => {
    setParams({ ...DEFAULT_PARAMS });
  };

  return {
    params,
    setParams,
    result,
    isLoading,
    generatePrediction,
    resetParams
  };
}
