import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PredictionSection from "@/components/sections/PredictionSection";
import FeatureHighlights from "@/components/sections/FeatureHighlights";
import EducationalResources from "@/components/sections/EducationalResources";
import AIAssistantChat from "@/components/sections/AIAssistantChat";
import MedicalAnalytics from "@/components/sections/MedicalAnalytics";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <HeroSection />
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12 flex flex-col gap-12 md:gap-20">
        <PredictionSection />
        <FeatureHighlights />
        <EducationalResources />
        <MedicalAnalytics />
        <AIAssistantChat />
      </main>
      <Footer />
    </div>
  );
}
