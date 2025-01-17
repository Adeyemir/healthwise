interface RiskFactors {
  age: string;
  bmi: number;
  bloodSugar: string;
  familyHistory: string;
  physicalActivity: string;
  lifestyle: string;
  comorbidities: string;
}

export const calculateDiabetesRisk = (factors: RiskFactors) => {
  let risk = 0;
  
  // Age risk
  const age = parseInt(factors.age);
  if (age > 45) risk += 20;
  else if (age > 35) risk += 10;

  // BMI risk
  if (factors.bmi >= 30) risk += 20;
  else if (factors.bmi >= 25) risk += 10;

  // Blood sugar risk
  const bloodSugar = parseInt(factors.bloodSugar);
  if (bloodSugar >= 126) risk += 25;
  else if (bloodSugar >= 100) risk += 15;

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

export const getDiabetesTypes = (bloodSugar: string, age: string) => {
  const bs = parseInt(bloodSugar);
  const ageNum = parseInt(age);
  
  return {
    type1: ageNum < 30 && bs >= 126 ? 60 : 20,
    type2: ageNum >= 30 && bs >= 126 ? 70 : 25,
    prediabetes: bs >= 100 && bs < 126 ? 80 : 15,
  };
};