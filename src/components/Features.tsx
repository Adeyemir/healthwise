import { Activity, Brain, ChartLineUp, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "AI-Powered Predictions",
    description: "Advanced machine learning algorithms predict diabetes risk with high accuracy.",
    icon: Brain,
  },
  {
    title: "Real-time Monitoring",
    description: "Track blood glucose levels, medication, and lifestyle factors in real-time.",
    icon: Activity,
  },
  {
    title: "Data Analytics",
    description: "Comprehensive insights and trends to help you make informed decisions.",
    icon: ChartLineUp,
  },
  {
    title: "Secure & Private",
    description: "Your health data is protected with enterprise-grade security measures.",
    icon: Shield,
  },
];

export const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Diabetes Management
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with easy-to-use features
            to help you manage your diabetes effectively.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};