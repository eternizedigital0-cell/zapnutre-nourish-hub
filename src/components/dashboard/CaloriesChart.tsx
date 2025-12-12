interface CaloriesChartProps {
  consumed: number;
  goal: number;
  carbs: { value: number; goal: number };
  protein: { value: number; goal: number };
  fat: { value: number; goal: number };
  showGoals?: boolean;
}

const CaloriesChart = ({ consumed, goal, carbs, protein, fat, showGoals = true }: CaloriesChartProps) => {
  const caloriesPercentage = Math.min((consumed / goal) * 100, 100);
  const carbsPercentage = Math.min((carbs.value / carbs.goal) * 100, 100);
  const proteinPercentage = Math.min((protein.value / protein.goal) * 100, 100);
  const fatPercentage = Math.min((fat.value / fat.goal) * 100, 100);

  const getStatusColor = (value: number, goal: number) => {
    const ratio = value / goal;
    if (ratio < 0.8) return "text-amber-500";
    if (ratio > 1.1) return "text-red-500";
    return "text-primary";
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      {/* Calories Main Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-foreground font-poppins">Calorias diárias</h3>
          <div className="text-right">
            <span className={`font-bold font-poppins ${getStatusColor(consumed, goal)}`}>
              {consumed}
            </span>
            {showGoals && (
              <span className="text-muted-foreground font-poppins"> / {goal} kcal</span>
            )}
            {!showGoals && <span className="text-foreground font-poppins"> kcal</span>}
          </div>
        </div>
        <div className="h-4 bg-background rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary rounded-full transition-all duration-500"
            style={{ width: `${caloriesPercentage}%` }}
          />
        </div>
        {showGoals && (
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground font-poppins">0</span>
            <span className="text-xs text-muted-foreground font-poppins">Meta: {goal} kcal</span>
          </div>
        )}
      </div>

      {/* Macros */}
      <div className="grid grid-cols-3 gap-4">
        {/* Carbs */}
        <div>
          <p className="text-sm text-muted-foreground font-poppins mb-1">Carboidratos</p>
          <div className="h-2 bg-background rounded-full overflow-hidden mb-1">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${carbsPercentage}%` }}
            />
          </div>
          <p className="text-sm font-poppins">
            <span className={`font-semibold ${getStatusColor(carbs.value, carbs.goal)}`}>
              {carbs.value}g
            </span>
            {showGoals && (
              <span className="text-muted-foreground"> / {carbs.goal}g</span>
            )}
          </p>
        </div>

        {/* Protein */}
        <div>
          <p className="text-sm text-muted-foreground font-poppins mb-1">Proteína</p>
          <div className="h-2 bg-background rounded-full overflow-hidden mb-1">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${proteinPercentage}%` }}
            />
          </div>
          <p className="text-sm font-poppins">
            <span className={`font-semibold ${getStatusColor(protein.value, protein.goal)}`}>
              {protein.value}g
            </span>
            {showGoals && (
              <span className="text-muted-foreground"> / {protein.goal}g</span>
            )}
          </p>
        </div>

        {/* Fat */}
        <div>
          <p className="text-sm text-muted-foreground font-poppins mb-1">Gordura</p>
          <div className="h-2 bg-background rounded-full overflow-hidden mb-1">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${fatPercentage}%` }}
            />
          </div>
          <p className="text-sm font-poppins">
            <span className={`font-semibold ${getStatusColor(fat.value, fat.goal)}`}>
              {fat.value}g
            </span>
            {showGoals && (
              <span className="text-muted-foreground"> / {fat.goal}g</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaloriesChart;
