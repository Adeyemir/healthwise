
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { PersonalInfoFields } from "./diabetes-form/PersonalInfoFields";
import { HealthMetricsFields } from "./diabetes-form/HealthMetricsFields";
import { LifestyleFields } from "./diabetes-form/LifestyleFields";
import { formSchema, calculateBMI } from "./diabetes-form/schema";
import { useNavigate } from "react-router-dom";
import { calculateDiabetesRisk, getDiabetesTypes } from "@/utils/diabetesRiskCalculator";

export function DiabetesInputForm() {
  const navigate = useNavigate();
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    const bmi = calculateBMI(values.height, values.weight);
    const age = parseFloat(values.age);
    const bloodSugar = parseFloat(values.bloodSugar);
    
    const risk = calculateDiabetesRisk({
      age,
      bmi: parseFloat(bmi),
      bloodSugar,
      familyHistory: values.familyHistory,
      physicalActivity: values.physicalActivity,
      lifestyle: values.lifestyle,
      comorbidities: values.comorbidities,
    });
    
    const types = getDiabetesTypes(bloodSugar, age);
    
    toast({
      title: "Health Information Submitted!",
      description: `Your BMI is ${bmi}. We'll analyze your comprehensive health data for diabetes risk assessment.`,
    });
    
    navigate('/meal-plan', { 
      state: {
        ...values,
        bmi,
        diabetesRisk: risk,
        diabetesTypes: types,
      }
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Comprehensive Health Assessment</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <PersonalInfoFields form={form} />
          <HealthMetricsFields form={form} />
          <LifestyleFields form={form} />
          <Button type="submit" className="w-full">Submit Health Information</Button>
        </form>
      </Form>
    </div>
  );
}
