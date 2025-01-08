import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Utensils, Clock, Heart } from "lucide-react";

const MealPlan = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Personalized Health Plan</h1>
          <p className="text-lg text-gray-600">Tailored nutrition and activity recommendations based on your assessment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-green-50 to-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Utensils className="w-6 h-6 text-green-600" />
                <CardTitle>Daily Meal Schedule</CardTitle>
              </div>
              <CardDescription>Optimized timing for balanced blood sugar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">7:00 AM - Breakfast</h4>
                    <p className="text-sm text-gray-600">Oatmeal with berries and nuts (Low GI carbs + protein)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">10:00 AM - Mid-Morning Snack</h4>
                    <p className="text-sm text-gray-600">Greek yogurt with seeds (Protein + healthy fats)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">1:00 PM - Lunch</h4>
                    <p className="text-sm text-gray-600">Quinoa bowl with grilled chicken and vegetables</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">4:00 PM - Afternoon Snack</h4>
                    <p className="text-sm text-gray-600">Apple slices with almond butter</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">7:00 PM - Dinner</h4>
                    <p className="text-sm text-gray-600">Grilled fish with roasted vegetables</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-600" />
                <CardTitle>Physical Activity Plan</CardTitle>
              </div>
              <CardDescription>Activities to help manage blood sugar levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold mb-2">Aerobic Exercise (30 mins, 5 days/week)</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Brisk walking or light jogging</li>
                    <li>• Swimming or water aerobics</li>
                    <li>• Cycling on flat terrain</li>
                    <li>• Low-impact dance classes</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold mb-2">Strength Training (20-30 mins, 2-3 days/week)</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Bodyweight exercises</li>
                    <li>• Resistance band workouts</li>
                    <li>• Light dumbbell exercises</li>
                    <li>• Yoga or Pilates</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold mb-2">Daily Activities</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Take stairs instead of elevator</li>
                    <li>• Park farther from destinations</li>
                    <li>• Garden or do yard work</li>
                    <li>• House cleaning or other active chores</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-600" />
              <CardTitle>Health Benefits</CardTitle>
            </div>
            <CardDescription>Why this plan works for managing diabetes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Dietary Benefits</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Stabilizes blood sugar levels</li>
                  <li>• Promotes healthy weight management</li>
                  <li>• Reduces inflammation</li>
                  <li>• Improves insulin sensitivity</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Exercise Benefits</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Lowers blood glucose levels</li>
                  <li>• Improves cardiovascular health</li>
                  <li>• Reduces stress and anxiety</li>
                  <li>• Enhances overall well-being</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="mx-2"
          >
            Back to Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealPlan;