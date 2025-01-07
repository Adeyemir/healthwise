import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  age: z.string().min(1, "Age is required"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  bloodSugar: z.string().min(1, "Blood sugar level is required"),
  insulinLevel: z.string().min(1, "Insulin level is required"),
  systolicBP: z.string().min(1, "Systolic blood pressure is required"),
  diastolicBP: z.string().min(1, "Diastolic blood pressure is required"),
  physicalActivity: z.string(),
  lifestyle: z.string(),
  comorbidities: z.string(),
  familyHistory: z.string(),
});

export function DiabetesInputForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      height: "",
      weight: "",
      bloodSugar: "",
      insulinLevel: "",
      systolicBP: "",
      diastolicBP: "",
      physicalActivity: "",
      lifestyle: "",
      comorbidities: "",
      familyHistory: "",
    },
  });

  function calculateBMI(height: string, weight: string) {
    const heightInMeters = parseFloat(height) / 100; // Convert cm to meters
    const weightInKg = parseFloat(weight);
    return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const bmi = calculateBMI(values.height, values.weight);
    toast({
      title: "Health Information Submitted!",
      description: `Your BMI is ${bmi}. We'll analyze your comprehensive health data for diabetes risk assessment.`,
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Comprehensive Health Assessment</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age (years)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="35" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="170" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="70" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodSugar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Sugar Level (mg/dL)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="100" {...field} />
                  </FormControl>
                  <FormDescription>Fasting blood glucose level</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insulinLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insulin Level (μU/mL)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="15" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="systolicBP"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Systolic BP</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="120" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diastolicBP"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diastolic BP</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="80" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="physicalActivity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Physical Activity Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (Little to no exercise)</SelectItem>
                    <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                    <SelectItem value="very_active">Very Active (Professional athlete)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lifestyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lifestyle Factors</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lifestyle factors" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="healthy">Healthy diet and regular exercise</SelectItem>
                    <SelectItem value="moderate">Balanced lifestyle with some exercise</SelectItem>
                    <SelectItem value="sedentary">Sedentary with poor diet</SelectItem>
                    <SelectItem value="smoker">Smoker</SelectItem>
                    <SelectItem value="alcohol">Regular alcohol consumption</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comorbidities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Co-morbidities</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select existing conditions" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="hypertension">Hypertension</SelectItem>
                    <SelectItem value="heart_disease">Heart Disease</SelectItem>
                    <SelectItem value="obesity">Obesity</SelectItem>
                    <SelectItem value="thyroid">Thyroid Disorder</SelectItem>
                    <SelectItem value="multiple">Multiple Conditions</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="familyHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Family History of Diabetes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please describe any family history of diabetes (parents, siblings, etc.)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">Submit Health Information</Button>
        </form>
      </Form>
    </div>
  );
}