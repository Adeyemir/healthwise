import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./schema";

type LifestyleFieldsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function LifestyleFields({ form }: LifestyleFieldsProps) {
  return (
    <div className="space-y-6">
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
    </div>
  );
}