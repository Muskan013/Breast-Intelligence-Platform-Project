import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  DEFAULT_PARAMS, 
  PredictionParams, 
  PredictionResult,
  makePrediction,
  makePredictionFromFile
} from "@/lib/predictionModel";

export function usePrediction() {
  const [params, setParams] = useState<PredictionParams>({ ...DEFAULT_PARAMS });
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [predictionMethod, setPredictionMethod] = useState<'params' | 'file'>('params');
  const { toast } = useToast();

  const generatePrediction = async () => {
    setIsLoading(true);
    
    try {
      if (predictionMethod === 'params') {
        const prediction = await makePrediction(params);
        setResult(prediction);
      } else if (predictionMethod === 'file' && uploadedFile) {
        const prediction = await makePredictionFromFile(uploadedFile);
        setResult(prediction);
      } else {
        throw new Error("Invalid prediction method or missing file");
      }
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

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setPredictionMethod('file');
    // Reset any previous results
    setResult(null);
  };

  const clearFile = () => {
    setUploadedFile(null);
    setPredictionMethod('params');
  };

  const resetParams = () => {
    setParams({ ...DEFAULT_PARAMS });
    if (predictionMethod === 'params') {
      setResult(null);
    }
  };

  return {
    params,
    setParams,
    result,
    isLoading,
    generatePrediction,
    resetParams,
    uploadedFile,
    handleFileUpload,
    clearFile,
    predictionMethod,
    setPredictionMethod
  };
}
