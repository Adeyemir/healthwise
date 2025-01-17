import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CookingPot, Carrot, Activity, Dumbbell, Coffee, PersonStanding } from "lucide-react";

const MealPlan = () => {
  const navigate = useNavigate();

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
                    <p className="text-sm text-gray-600">Oatmeal with berries and nuts</p>
                    <p className="text-xs text-gray-500 mt-1">Low GI carbs + protein</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-green-50 transition-colors">
                  <Carrot className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Mid-Morning Snack (10:00 AM)</h4>
                    <p className="text-sm text-gray-600">Greek yogurt with seeds</p>
                    <p className="text-xs text-gray-500 mt-1">Protein + healthy fats</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-green-50 transition-colors">
                  <CookingPot className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Lunch (1:00 PM)</h4>
                    <p className="text-sm text-gray-600">Quinoa bowl with grilled chicken</p>
                    <p className="text-xs text-gray-500 mt-1">Complex carbs + lean protein</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-green-50 transition-colors">
                  <Carrot className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Afternoon Snack (4:00 PM)</h4>
                    <p className="text-sm text-gray-600">Apple slices with almond butter</p>
                    <p className="text-xs text-gray-500 mt-1">Balanced energy boost</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-green-50 transition-colors">
                  <CookingPot className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Dinner (7:00 PM)</h4>
                    <p className="text-sm text-gray-600">Grilled fish with roasted vegetables</p>
                    <p className="text-xs text-gray-500 mt-1">Lean protein + fiber</p>
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
                  <p className="text-sm text-gray-600 mb-2">30 minutes, 5 days/week</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Brisk walking or light jogging
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Swimming or water aerobics
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Cycling on flat terrain
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-4 hover:bg-blue-50 transition-colors rounded-r-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Dumbbell className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold">Strength Training</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">20-30 minutes, 2-3 days/week</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Bodyweight exercises
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Resistance band workouts
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Light dumbbell exercises
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-4 hover:bg-blue-50 transition-colors rounded-r-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold">Daily Activities</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Take stairs instead of elevator
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Park farther from destinations
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Active household chores
                    </li>
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