import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: "95%", label: "Prediction Accuracy" },
  { value: "50K+", label: "Active Users" },
  { value: "24/7", label: "Support Available" },
  { value: "100%", label: "HIPAA Compliant" },
];

export const Stats = () => {
  return (
    <section className="bg-primary/5 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none bg-white/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};