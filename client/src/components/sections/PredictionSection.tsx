import { useState } from "react";
import PredictionForm from "@/components/ui/PredictionForm";
import PredictionResults from "@/components/ui/PredictionResults";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PredictionParams, PredictionResult } from "@/lib/predictionModel";
import { usePrediction } from "@/hooks/usePrediction";

export default function PredictionSection() {
  const { 
    params, 
    setParams, 
    result, 
    isLoading, 
    generatePrediction,
    resetParams 
  } = usePrediction();

  return (
    <section id="prediction" className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Breast Cancer Prediction Tool</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Enter patient parameters to generate a prediction based on our machine learning model trained on clinical data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Parameter Input Panel */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-primary-500 text-white">
              <CardTitle className="text-xl">Patient Parameters</CardTitle>
              <p className="text-sm text-blue-100">Enter clinical measurements to generate prediction</p>
            </CardHeader>
            <CardContent className="p-6">
              <PredictionForm 
                params={params} 
                setParams={setParams} 
                onSubmit={generatePrediction}
                onReset={resetParams}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div>
          <Card>
            <CardHeader className="bg-primary-500 text-white">
              <CardTitle className="text-xl">Prediction Results</CardTitle>
              <p className="text-sm text-blue-100">Analysis based on machine learning model</p>
            </CardHeader>
            <CardContent className="p-6">
              <PredictionResults 
                result={result} 
                isLoading={isLoading} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
