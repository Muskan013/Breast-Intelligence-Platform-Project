import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PredictionSection from "@/components/sections/PredictionSection";
import FeatureHighlights from "@/components/sections/FeatureHighlights";
import EducationalResources from "@/components/sections/EducationalResources";
import AIAssistantChat from "@/components/sections/AIAssistantChat";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <main className="container mx-auto px-4 py-12">
        <PredictionSection />
        <FeatureHighlights />
        <EducationalResources />
        <AIAssistantChat />
      </main>
      <Footer />
    </div>
  );
}
