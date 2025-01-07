import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MealPlan = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Personalized Meal Plan</h1>
          <p className="text-lg text-gray-600">Based on your health assessment results</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Breakfast Options</CardTitle>
              <CardDescription>Start your day right with these balanced meals</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>• Oatmeal with berries and nuts</li>
                <li>• Greek yogurt with seeds and honey</li>
                <li>• Whole grain toast with avocado</li>
                <li>• Vegetable omelet with whole grain bread</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lunch Suggestions</CardTitle>
              <CardDescription>Nutritious midday meals to keep you energized</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>• Quinoa bowl with grilled chicken</li>
                <li>• Mixed green salad with lean protein</li>
                <li>• Whole grain wrap with turkey and vegetables</li>
                <li>• Lentil soup with whole grain crackers</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dinner Ideas</CardTitle>
              <CardDescription>Complete your day with these balanced options</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>• Grilled fish with roasted vegetables</li>
                <li>• Lean beef stir-fry with brown rice</li>
                <li>• Baked chicken with sweet potato</li>
                <li>• Tofu and vegetable curry</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dietary Guidelines</CardTitle>
              <CardDescription>Key principles for managing blood sugar levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>• Monitor portion sizes carefully</li>
                <li>• Choose foods with a low glycemic index</li>
                <li>• Include lean proteins in every meal</li>
                <li>• Incorporate healthy fats in moderation</li>
                <li>• Stay hydrated with water throughout the day</li>
                <li>• Limit processed foods and added sugars</li>
              </ul>
            </CardContent>
          </Card>
        </div>

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