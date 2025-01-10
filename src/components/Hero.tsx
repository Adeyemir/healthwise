import { ArrowRight, HeartPulse, Activity, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Hero = () => {
  return (
    <div className="hero-gradient min-h-screen">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
              <HeartPulse className="w-8 h-8 text-primary animate-pulse" />
              <span className="text-primary font-semibold">Your Health Companion</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Your Journey to{" "}
              <span className="text-primary">Better Health</span>{" "}
              Starts Here
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Take control of your diabetes management with personalized insights, meal plans, and expert guidance. Join thousands of others on their path to wellness.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="gap-2 group">
                Start Your Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                Learn More
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
              <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                <Activity className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="font-semibold">Personalized Plans</p>
              </Card>
              <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="font-semibold">Expert Support</p>
              </Card>
              <Card className="p-4 text-center hover:shadow-lg transition-shadow hidden sm:block">
                <HeartPulse className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="font-semibold">Health Tracking</p>
              </Card>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80"
              alt="Healthcare professional with patient"
              className="rounded-2xl shadow-2xl relative z-10 w-full max-w-lg mx-auto"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
};