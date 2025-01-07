import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Take Control of Your Health Today
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of users who have transformed their diabetes management
          with our AI-powered platform.
        </p>
        <Button size="lg" className="px-8">
          Start Your Free Trial
        </Button>
      </div>
    </section>
  );
};