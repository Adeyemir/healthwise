import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Stats } from "@/components/Stats";
import { CTA } from "@/components/CTA";
import { DiabetesInputForm } from "@/components/DiabetesInputForm";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <div className="py-16 bg-gray-50">
        <DiabetesInputForm />
      </div>
      <Stats />
      <CTA />
    </div>
  );
};

export default Index;