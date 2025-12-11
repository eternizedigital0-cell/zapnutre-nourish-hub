import CaloriesChart from "@/components/dashboard/CaloriesChart";
import MealCard from "@/components/meals/MealCard";

const mockMeals = [
  {
    id: "1",
    name: "Café da manhã",
    time: "07:00",
    totalCalories: 450,
    foods: [
      { name: "Pão integral", quantity: "2 fatias (50g)", calories: 120, carbs: 22, protein: 4, fat: 1 },
      { name: "Ovo mexido", quantity: "2 unidades", calories: 180, carbs: 1, protein: 12, fat: 14 },
      { name: "Suco de laranja", quantity: "200ml", calories: 90, carbs: 21, protein: 1, fat: 0 },
      { name: "Queijo cottage", quantity: "30g", calories: 60, carbs: 1, protein: 7, fat: 3 },
    ],
  },
  {
    id: "2",
    name: "Almoço",
    time: "12:30",
    totalCalories: 720,
    foods: [
      { name: "Arroz integral", quantity: "150g", calories: 180, carbs: 38, protein: 4, fat: 2 },
      { name: "Feijão preto", quantity: "100g", calories: 130, carbs: 23, protein: 9, fat: 1 },
      { name: "Frango grelhado", quantity: "150g", calories: 250, carbs: 0, protein: 45, fat: 7 },
      { name: "Salada verde", quantity: "100g", calories: 20, carbs: 4, protein: 1, fat: 0 },
      { name: "Azeite de oliva", quantity: "1 colher", calories: 140, carbs: 0, protein: 0, fat: 15 },
    ],
  },
  {
    id: "3",
    name: "Lanche da tarde",
    time: "16:00",
    totalCalories: 280,
    foods: [
      { name: "Iogurte natural", quantity: "170g", calories: 100, carbs: 12, protein: 10, fat: 2 },
      { name: "Granola", quantity: "30g", calories: 120, carbs: 20, protein: 3, fat: 4 },
      { name: "Banana", quantity: "1 unidade", calories: 60, carbs: 15, protein: 1, fat: 0 },
    ],
  },
];

const PatientDiary = () => {
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-poppins">Diário Alimentar</h1>
        <p className="text-muted-foreground font-poppins capitalize">{today}</p>
      </div>

      {/* Calories Summary */}
      <CaloriesChart
        consumed={1450}
        goal={2200}
        carbs={{ value: 165, goal: 280 }}
        protein={{ value: 78, goal: 120 }}
        fat={{ value: 42, goal: 70 }}
      />

      {/* Meals */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground font-poppins">Refeições registradas</h3>
        {mockMeals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default PatientDiary;
