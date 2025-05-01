import { useState } from "react";
import { FileText, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { generateMedicalInfoReport } from "@/lib/pdfReportService";

export default function MedicalInfoReportGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("general");
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");

  const handleGenerateReport = async () => {
    try {
      setIsGenerating(true);
      await generateMedicalInfoReport(
        selectedTopic,
        patientName.trim() || "Anonymous Patient",
        doctorName.trim() || "Healthcare Professional"
      );
    } catch (error) {
      console.error("Error generating medical information report:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const topics = [
    { id: "general", name: "General Breast Cancer Information" },
    { id: "symptoms", name: "Breast Cancer Symptoms" },
    { id: "screening", name: "Breast Cancer Screening" },
    { id: "treatment", name: "Breast Cancer Treatment Options" },
    { id: "prevention", name: "Breast Cancer Prevention" },
  ];

  return (
    <Card className="p-6 bg-black/50 backdrop-blur-sm border-primary/30 rounded-xl relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary rounded-full blur-[100px] -top-10 -right-10"></div>
        <div className="absolute w-64 h-64 bg-secondary rounded-full blur-[80px] bottom-10 left-10"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-white">Medical Information Reports</h2>
        </div>
        
        <p className="text-gray-300 text-sm mb-6">
          Generate comprehensive medical information PDF reports about breast cancer for patient education and clinical reference.
        </p>
        
        <div className="space-y-6">
          <div>
            <Label className="text-white mb-2 block">Select Topic</Label>
            <RadioGroup 
              value={selectedTopic} 
              onValueChange={setSelectedTopic}
              className="grid gap-2"
            >
              {topics.map(topic => (
                <div key={topic.id} className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg backdrop-blur-sm border border-white/5 hover:border-primary/20 transition">
                  <RadioGroupItem value={topic.id} id={topic.id} className="text-primary border-primary/50" />
                  <Label htmlFor={topic.id} className="text-white font-medium cursor-pointer">{topic.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName" className="text-white">Patient Name (Optional)</Label>
              <Input 
                id="patientName"
                placeholder="Enter patient name" 
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="doctorName" className="text-white">Doctor Name (Optional)</Label>
              <Input 
                id="doctorName"
                placeholder="Enter doctor name" 
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white gap-2 py-5"
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating PDF Report...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Generate Medical Information PDF
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}