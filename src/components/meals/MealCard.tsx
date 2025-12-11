import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Food {
  name: string;
  quantity: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

interface MealCardProps {
  meal: {
    id: string;
    name: string;
    time: string;
    foods: Food[];
    totalCalories: number;
  };
}

const MealCard = ({ meal }: MealCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-background/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-medium font-poppins">
              {meal.time}
            </span>
          </div>
          <div className="text-left">
            <p className="font-semibold text-foreground font-poppins">{meal.name}</p>
            <p className="text-sm text-muted-foreground font-poppins">
              {meal.foods.length} {meal.foods.length === 1 ? "alimento" : "alimentos"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold text-foreground font-poppins">{meal.totalCalories} kcal</span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isExpanded ? "max-h-96" : "max-h-0"
      )}>
        <div className="p-4 pt-0 space-y-3">
          {meal.foods.map((food, index) => (
            <div
              key={index}
              className="p-3 bg-background rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-foreground font-poppins text-sm">{food.name}</p>
                  <p className="text-xs text-muted-foreground font-poppins">{food.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-foreground font-poppins">{food.calories} kcal</span>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground font-poppins">
                <span>C: {food.carbs}g</span>
                <span>P: {food.protein}g</span>
                <span>G: {food.fat}g</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealCard;
