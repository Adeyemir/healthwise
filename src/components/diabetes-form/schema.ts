import * as z from "zod";

export const formSchema = z.object({
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

export function calculateBMI(height: string, weight: string) {
  const heightInMeters = parseFloat(height) / 100; // Convert cm to meters
  const weightInKg = parseFloat(weight);
  return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
}