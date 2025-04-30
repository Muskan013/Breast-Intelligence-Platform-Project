import { PredictionResult } from "@/lib/predictionModel";
import { CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PredictionResultsProps {
  result: PredictionResult | null;
  isLoading: boolean;
}

export default function PredictionResults({ result, isLoading }: PredictionResultsProps) {
  // Convert probability to percentage
  const formatPercentage = (value: number) => {
    return `${Math.round(value * 100)}%`;
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
      <div className="text-center py-12 flex-grow flex items-center justify-center flex-col">
        <div className="w-48 h-48 rounded-full object-cover mb-6 shadow-md bg-gray-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M2.5 2v6h6M21.5 22v-6h-6" />
            <path d="M22 8.5c0 4.142-6 4.142-6 8.5 0-4.358-6-4.358-6-8.5 0 4.142-6 4.142-6-0 0 4.358 6 4.358 6 0 0-4.142 6-4.142 6 0Z" />
          </svg>
        </div>
        <p className="text-gray-500 max-w-xs mx-auto">
          Enter patient parameters and click "Generate Prediction" to see results.
        </p>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center py-12 flex-grow flex items-center justify-center flex-col">
        <div className="w-20 h-20 border-4 border-blue-200 border-t-primary-500 rounded-full animate-spin mb-6"></div>
        <p className="text-gray-600">Processing patient data...</p>
      </div>
    );
  }

  // Results state
  const gaugeStyles = getGaugeStyles(result!.benignProbability);
  
  return (
    <div className="flex-grow flex flex-col">
      <div className="mb-8 text-center">
        <div className="inline-block p-1 rounded-full bg-white shadow-md mb-4">
          <div className={`rounded-full p-3 ${result!.classification === 'Benign' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>
        <h4 className="text-xl font-bold text-gray-800">Prediction Complete</h4>
      </div>

      <div className="relative mb-8 mx-auto w-56 h-56">
        <div className="w-full h-full rounded-full border-8 border-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-4xl font-bold ${result!.classification === 'Benign' ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercentage(result!.classification === 'Benign' ? result!.benignProbability : result!.malignantProbability)}
            </div>
            <div className="text-sm text-gray-500">
              {result!.classification === 'Benign' ? 'Benign probability' : 'Malignant probability'}
            </div>
          </div>
        </div>
        <div 
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          style={{
            clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)",
            transform: `rotate(${gaugeStyles.rotation})`,
          }}
        >
          <div className={`w-full h-full border-8 ${result!.classification === 'Benign' ? 'border-green-500' : 'border-red-500'} rounded-full`}></div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h5 className="font-semibold text-gray-700 mb-2">Prediction Summary</h5>
        <ul className="space-y-3 text-sm">
          <li>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Malignant Probability:</span>
              <span className="font-medium text-red-500">{formatPercentage(result!.malignantProbability)}</span>
            </div>
            <Progress value={result!.malignantProbability * 100} className="h-2 bg-gray-200" indicatorClassName="bg-red-500" />
          </li>
          <li>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Benign Probability:</span>
              <span className="font-medium text-green-500">{formatPercentage(result!.benignProbability)}</span>
            </div>
            <Progress value={result!.benignProbability * 100} className="h-2 bg-gray-200" indicatorClassName="bg-green-500" />
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Confidence Level:</span>
            <span className="font-medium text-gray-800">{result!.confidenceLevel}</span>
          </li>
        </ul>
      </div>

      <Alert className="bg-blue-50 border-l-4 border-primary-500 p-4 text-sm text-blue-700">
        <AlertDescription>
          <p><strong>Note:</strong> This prediction is a clinical decision support tool and should not replace professional medical diagnosis. Always consult with a healthcare provider.</p>
        </AlertDescription>
      </Alert>

      <div className="mt-auto pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
        <p>Model trained on Wisconsin Breast Cancer Dataset<br />Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      </div>
    </div>
  );
}
