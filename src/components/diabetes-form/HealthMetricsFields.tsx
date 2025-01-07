import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./schema";

type HealthMetricsFieldsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export function HealthMetricsFields({ form }: HealthMetricsFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  );
}