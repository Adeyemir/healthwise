interface RiskFactors {
  age: number;
  bmi: number;
  bloodSugar: number;
  familyHistory: string;
  physicalActivity: string;
  lifestyle: string;
  comorbidities: string;
}

export const calculateDiabetesRisk = (factors: RiskFactors) => {
  let risk = 0;
  
  // Age risk
  if (factors.age > 45) risk += 20;
  else if (factors.age > 35) risk += 10;

  // BMI risk
  if (factors.bmi >= 30) risk += 20;
  else if (factors.bmi >= 25) risk += 10;

  // Blood sugar risk
  if (factors.bloodSugar >= 126) risk += 25;
  else if (factors.bloodSugar >= 100) risk += 15;

  // Family history risk
  if (factors.familyHistory.toLowerCase().includes('parent') || 
      factors.familyHistory.toLowerCase().includes('sibling')) {
    risk += 15;
  }

  // Physical activity risk reduction
  if (factors.physicalActivity === 'active' || factors.physicalActivity === 'very_active') {
    risk -= 10;
  } else if (factors.physicalActivity === 'sedentary') {
    risk += 10;
  }

  // Lifestyle risk
  if (factors.lifestyle === 'sedentary' || factors.lifestyle === 'smoker') {
    risk += 10;
  }

  // Comorbidities risk
  if (factors.comorbidities === 'multiple') {
    risk += 15;
  } else if (factors.comorbidities !== 'none') {
    risk += 10;
  }

  // Ensure risk stays within 0-100 range
  return Math.min(Math.max(risk, 0), 100);
};

export const getDiabetesTypes = (bloodSugar: number, age: number) => {
  return {
    type1: age < 30 && bloodSugar >= 126 ? 60 : 20,
    type2: age >= 30 && bloodSugar >= 126 ? 70 : 25,
    prediabetes: bloodSugar >= 100 && bloodSugar < 126 ? 80 : 15,
  };
};