import { Card, CardContent } from "@/components/ui/card";
import { Brain, UserRound, TrendingUp } from "lucide-react";

export default function FeatureHighlights() {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-primary-500" />,
      title: "AI Prediction",
      description: "Our model uses a neural network trained on thousands of histopathology samples with verified diagnoses."
    },
    {
      icon: <UserRound className="h-6 w-6 text-primary-500" />,
      title: "Medical Expertise",
      description: "Developed in collaboration with oncologists and pathologists to ensure clinical relevance and accuracy."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary-500" />,
      title: "Continuous Learning",
      description: "Our system continuously improves as it processes more cases and incorporates the latest research."
    }
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">How It Works</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Our prediction system combines advanced machine learning with medical expertise
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
