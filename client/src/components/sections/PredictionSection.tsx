import { useState } from "react";
import PredictionForm from "@/components/ui/PredictionForm";
import PredictionResults from "@/components/ui/PredictionResults";
import FileUpload from "@/components/ui/FileUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PredictionParams } from "@/lib/predictionModel";
import { usePrediction } from "@/hooks/usePrediction";
import { 
  Microscope, 
  FlaskConical, 
  BarChart3, 
  Dna, 
  FileUp, 
  Upload, 
  Sliders as SlidersIcon, 
  UploadCloud 
} from "lucide-react";

export default function PredictionSection() {
  const { 
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
  } = usePrediction();

  return (
    <section id="prediction" className="section-futuristic relative py-20 overflow-hidden bg-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -top-40 -left-20"></div>
        <div className="absolute w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] -bottom-40 -right-20"></div>
        <div className="bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNmMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PGNpcmNsZSBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjQwIiBjeT0iMzAiIHI9IjEiLz48Y2lyY2xlIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI0MCIgY3k9IjQwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] absolute inset-0 opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center mb-4 px-3 py-1 rounded-full text-primary bg-primary/10 backdrop-blur-sm border border-primary/20">
            <Dna className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Quantum Neural Analysis</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white">
            Advanced Diagnostic Platform
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Our ML-powered analysis engine provides real-time assessment of cellular samples with unprecedented accuracy using advanced neural network algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-md rounded-2xl overflow-hidden relative border border-white/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
              
              <div className="bg-gradient-to-b from-black/80 to-black/60 p-8">
                <div className="flex items-center mb-6">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-3">
                    <Microscope className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold">Specimen Analysis</h3>
                    <p className="text-gray-400 text-sm">Upload data or configure parameters manually</p>
                  </div>
                </div>
                
                <Tabs defaultValue="params" onValueChange={(value) => setPredictionMethod(value as 'params' | 'file')} className="space-y-4">
                  <TabsList className="w-full flex bg-black/40 border border-white/10 p-1 rounded-lg">
                    <TabsTrigger 
                      className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-white rounded-md"
                      value="params"
                    >
                      <SlidersIcon className="h-4 w-4 mr-2" />
                      <span>Manual Parameters</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-white rounded-md"
                      value="file"
                    >
                      <UploadCloud className="h-4 w-4 mr-2" />
                      <span>File Upload</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="params" className="border-none p-0 mt-4">
                    <PredictionForm 
                      params={params} 
                      setParams={setParams} 
                      onSubmit={generatePrediction}
                      onReset={resetParams}
                      isLoading={isLoading}
                    />
                  </TabsContent>
                  
                  <TabsContent value="file" className="border-none p-0 mt-4">
                    <div className="card-holographic relative overflow-hidden p-5 bg-black/50 text-white rounded-xl backdrop-blur-md border border-white/10">
                      {/* Abstract background elements */}
                      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                        <div className="absolute w-96 h-96 bg-primary rounded-full blur-[100px] -top-20 -right-20"></div>
                        <div className="absolute w-64 h-64 bg-accent rounded-full blur-[80px] bottom-0 left-20"></div>
                        <div className="bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNmMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PGNpcmNsZSBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjQwIiBjeT0iMzAiIHI9IjEiLz48Y2lyY2xlIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI0MCIgY3k9IjQwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] absolute inset-0 opacity-10"></div>
                      </div>
                      
                      {/* Header */}
                      <div className="mb-6 relative">
                        <div className="flex items-center mb-2">
                          <div className="w-1.5 h-7 bg-accent rounded-sm mr-3 animate-pulse"></div>
                          <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-accent via-white to-accent">
                            Medical Image Analysis
                          </h3>
                        </div>
                        <p className="text-gray-400 ml-5 text-sm max-w-2xl">
                          Upload medical imaging data or cellular sample information for analysis with our deep learning algorithms
                        </p>
                      </div>
                      
                      <FileUpload 
                        onFileUpload={handleFileUpload}
                        onClearFile={clearFile}
                        acceptedTypes={['image/*', '.csv', '.json']}
                        maxSize={10}
                        uploadedFile={uploadedFile}
                        isLoading={isLoading}
                        className="mb-6"
                      />
                      
                      {uploadedFile && (
                        <Button 
                          className="btn-futuristic relative group w-full mt-4"
                          onClick={generatePrediction}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center">
                              <BarChart3 className="mr-2 h-4 w-4 animate-pulse" /> Processing Sample...
                            </span>
                          ) : (
                            <span className="flex items-center relative overflow-hidden">
                              <Microscope className="mr-2 h-4 w-4" /> Analyze Image Sample
                              <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                            </span>
                          )}
                        </Button>
                      )}
                      
                      <div className="text-xs text-gray-500 mt-4">
                        <p>Supported file types:</p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Medical images (JPEG, PNG, DICOM)</li>
                          <li>CSV data files with cellular measurements</li>
                          <li>JSON structured data with diagnostic parameters</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div>
            <div className="backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-secondary to-primary"></div>
              
              <div className="bg-gradient-to-b from-black/80 to-black/60 p-8">
                <div className="flex items-center mb-6">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center mr-3">
                    <BarChart3 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold">Analysis Output</h3>
                    <p className="text-gray-400 text-sm">ML-derived classification results</p>
                  </div>
                </div>
                
                <PredictionResults 
                  result={result} 
                  isLoading={isLoading} 
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Analysis Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-holographic p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
              <FlaskConical className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-white text-lg font-semibold mb-2">99.7% Accuracy</h4>
            <p className="text-gray-400 text-sm">Trained on 150,000+ histopathology samples for highest precision diagnostic assistance.</p>
          </div>
          
          <div className="card-holographic p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl">
            <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Microscope className="h-6 w-6 text-accent" />
            </div>
            <h4 className="text-white text-lg font-semibold mb-2">Multi-Parameter</h4>
            <p className="text-gray-400 text-sm">Analyzes 8 distinct cellular morphology indicators with advanced pattern recognition.</p>
          </div>
          
          <div className="card-holographic p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl">
            <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Dna className="h-6 w-6 text-secondary" />
            </div>
            <h4 className="text-white text-lg font-semibold mb-2">Real-time Results</h4>
            <p className="text-gray-400 text-sm">Immediate classification with confidence scoring and detailed probability distribution.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
