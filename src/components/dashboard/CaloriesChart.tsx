interface CaloriesChartProps {
  consumed: number;
  goal: number;
  carbs: { value: number; goal: number };
  protein: { value: number; goal: number };
  fat: { value: number; goal: number };
}

const CaloriesChart = ({ consumed, goal, carbs, protein, fat }: CaloriesChartProps) => {
  const caloriesPercentage = Math.min((consumed / goal) * 100, 100);
  const carbsPercentage = Math.min((carbs.value / carbs.goal) * 100, 100);
  const proteinPercentage = Math.min((protein.value / protein.goal) * 100, 100);
  const fatPercentage = Math.min((fat.value / fat.goal) * 100, 100);

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      {/* Calories Main Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-foreground font-poppins">Calorias diárias</h3>
          <span className="font-bold text-foreground font-poppins">{consumed} kcal</span>
        </div>
        <div className="h-4 bg-background rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary rounded-full transition-all duration-500"
            style={{ width: `${caloriesPercentage}%` }}
          />
        </div>
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
          <p className="text-sm font-semibold text-foreground font-poppins">{carbs.value}g</p>
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
          <p className="text-sm font-semibold text-foreground font-poppins">{protein.value}g</p>
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
          <p className="text-sm font-semibold text-foreground font-poppins">{fat.value}g</p>
        </div>
      </div>
    </div>
  );
};

export default CaloriesChart;
