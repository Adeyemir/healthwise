import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CookingPot, Carrot, Activity, Dumbbell, Coffee, PersonStanding } from "lucide-react";

const getMealPlan = (bmi: number, lifestyle: string, physicalActivity: string) => {
  if (bmi >= 30) {
    return {
      breakfast: {
        meal: "Egg white omelet with spinach and whole grain toast",
        description: "High protein, low calorie breakfast"
      },
      morningSnack: {
        meal: "Greek yogurt with berries",
        description: "Protein-rich snack with antioxidants"
      },
      lunch: {
        meal: "Grilled chicken salad with olive oil dressing",
        description: "Lean protein with fiber-rich vegetables"
      },
      afternoonSnack: {
        meal: "Apple slices with almond butter",
        description: "Balanced energy boost"
      },
      dinner: {
        meal: "Baked fish with steamed vegetables",
        description: "Low-calorie, high-protein dinner"
      }
    };
  } else if (lifestyle === 'active' || physicalActivity === 'very_active') {
    return {
      breakfast: {
        meal: "Oatmeal with nuts, seeds, and protein powder",
        description: "High-energy breakfast for active individuals"
      },
      morningSnack: {
        meal: "Banana with protein shake",
        description: "Quick energy and muscle recovery"
      },
      lunch: {
        meal: "Quinoa bowl with grilled chicken and avocado",
        description: "Complex carbs and healthy fats"
      },
      afternoonSnack: {
        meal: "Trail mix with dried fruits",
        description: "Sustained energy release"
      },
      dinner: {
        meal: "Lean steak with sweet potato and vegetables",
        description: "Protein-rich dinner for recovery"
      }
    };
  } else {
    return {
      breakfast: {
        meal: "Whole grain toast with avocado and eggs",
        description: "Balanced breakfast with healthy fats"
      },
      morningSnack: {
        meal: "Mixed nuts and fruit",
        description: "Healthy snack with natural sugars"
      },
      lunch: {
        meal: "Turkey and hummus wrap with vegetables",
        description: "Lean protein with complex carbs"
      },
      afternoonSnack: {
        meal: "Celery with peanut butter",
        description: "Low-calorie protein snack"
      },
      dinner: {
        meal: "Grilled salmon with quinoa and vegetables",
        description: "Omega-3 rich dinner"
      }
    };
  }
};

const getActivityPlan = (physicalActivity: string, comorbidities: string) => {
  if (comorbidities === 'multiple' || comorbidities === 'heart_disease') {
    return {
      aerobic: {
        frequency: "20 minutes, 3 days/week",
        activities: [
          "Light walking",
          "Swimming",
          "Stationary cycling at low intensity"
        ]
      },
      strength: {
        frequency: "15-20 minutes, 2 days/week",
        activities: [
          "Light resistance bands",
          "Chair exercises",
          "Gentle stretching"
        ]
      }
    };
  } else if (physicalActivity === 'sedentary') {
    return {
      aerobic: {
        frequency: "25 minutes, 4 days/week",
        activities: [
          "Brisk walking",
          "Light jogging",
          "Cycling on flat terrain"
        ]
      },
      strength: {
        frequency: "20 minutes, 2-3 days/week",
        activities: [
          "Bodyweight exercises",
          "Light dumbbells",
          "Resistance bands"
        ]
      }
    };
  } else {
    return {
      aerobic: {
        frequency: "30 minutes, 5 days/week",
        activities: [
          "Running",
          "High-intensity cycling",
          "Swimming laps"
        ]
      },
      strength: {
        frequency: "30-45 minutes, 3 days/week",
        activities: [
          "Weight training",
          "Advanced bodyweight exercises",
          "Circuit training"
        ]
      }
    };
  }
};

const MealPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {
    height: "170",
    weight: "70",
    lifestyle: "moderate",
    physicalActivity: "light",
    comorbidities: "none"
  };

  const bmi = parseFloat(formData.weight) / ((parseFloat(formData.height) / 100) ** 2);
  const mealPlan = getMealPlan(bmi, formData.lifestyle, formData.physicalActivity);
  const activityPlan = getActivityPlan(formData.physicalActivity, formData.comorbidities);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Personalized Health Journey</h1>
          <p className="text-lg text-gray-600">Tailored nutrition and activity recommendations based on your profile</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CookingPot className="w-6 h-6 text-green-600" />
                <CardTitle>Daily Meal Schedule</CardTitle>
              </div>
              <CardDescription>Optimized timing for balanced blood sugar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-green-50 transition-colors">
                  <Coffee className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Breakfast (7:00 AM)</h4>
                    <p className="text-sm text-gray-600">{mealPlan.breakfast.meal}</p>
                    <p className="text-xs text-gray-500 mt-1">{mealPlan.breakfast.description}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-green-50 transition-colors">
                  <Carrot className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Mid-Morning Snack (10:00 AM)</h4>
                    <p className="text-sm text-gray-600">{mealPlan.morningSnack.meal}</p>
                    <p className="text-xs text-gray-500 mt-1">{mealPlan.morningSnack.description}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-green-50 transition-colors">
                  <CookingPot className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Lunch (1:00 PM)</h4>
                    <p className="text-sm text-gray-600">{mealPlan.lunch.meal}</p>
                    <p className="text-xs text-gray-500 mt-1">{mealPlan.lunch.description}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-green-50 transition-colors">
                  <Carrot className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Afternoon Snack (4:00 PM)</h4>
                    <p className="text-sm text-gray-600">{mealPlan.afternoonSnack.meal}</p>
                    <p className="text-xs text-gray-500 mt-1">{mealPlan.afternoonSnack.description}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-green-50 transition-colors">
                  <CookingPot className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Dinner (7:00 PM)</h4>
                    <p className="text-sm text-gray-600">{mealPlan.dinner.meal}</p>
                    <p className="text-xs text-gray-500 mt-1">{mealPlan.dinner.description}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-600" />
                <CardTitle>Physical Activity Plan</CardTitle>
              </div>
              <CardDescription>Activities to help manage blood sugar levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4 py-4 hover:bg-blue-50 transition-colors rounded-r-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <PersonStanding className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold">Aerobic Exercise</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{activityPlan.aerobic.frequency}</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {activityPlan.aerobic.activities.map((activity, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-4 hover:bg-blue-50 transition-colors rounded-r-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Dumbbell className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold">Strength Training</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{activityPlan.strength.frequency}</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {activityPlan.strength.activities.map((activity, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="hover:bg-gray-100"
          >
            Back to Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealPlan;