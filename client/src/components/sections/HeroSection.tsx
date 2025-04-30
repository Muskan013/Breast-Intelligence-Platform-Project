import { Button } from "@/components/ui/button";
import { Microscope, Bot } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-white py-12 md:py-20 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Advanced Breast Cancer Prediction Technology
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Utilize our AI-powered prediction system to assist in early detection and diagnosis of breast cancer with high accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="bg-primary-500 hover:bg-primary-600 text-white"
                onClick={() => document.getElementById("prediction")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Microscope className="mr-2 h-4 w-4" /> Start Prediction
              </Button>
              <Button
                variant="outline"
                className="border-primary-500 text-primary-500 hover:bg-gray-50"
                onClick={() => document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Bot className="mr-2 h-4 w-4" /> Ask AI Assistant
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Medical professionals analyzing data"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
