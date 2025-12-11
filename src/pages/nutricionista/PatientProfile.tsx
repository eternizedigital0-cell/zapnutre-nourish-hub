import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Utensils, TrendingUp, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import CaloriesChart from "@/components/dashboard/CaloriesChart";
import MealCard from "@/components/meals/MealCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const tabs = [
  { id: "diario", label: "Diário", icon: BookOpen },
  { id: "plano", label: "Meu Plano", icon: Utensils },
  { id: "evolucao", label: "Evolução", icon: TrendingUp },
  { id: "checkins", label: "Check-ins", icon: ClipboardCheck },
];

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
  {
    id: "4",
    name: "Jantar",
    time: "19:30",
    totalCalories: 520,
    foods: [
      { name: "Salmão assado", quantity: "150g", calories: 280, carbs: 0, protein: 35, fat: 15 },
      { name: "Batata doce", quantity: "150g", calories: 130, carbs: 30, protein: 2, fat: 0 },
      { name: "Brócolis", quantity: "100g", calories: 35, carbs: 7, protein: 3, fat: 0 },
      { name: "Azeite", quantity: "1 colher", calories: 75, carbs: 0, protein: 0, fat: 8 },
    ],
  },
];

const weightData = [
  { date: "01/11", weight: 72.5 },
  { date: "08/11", weight: 72.2 },
  { date: "15/11", weight: 71.8 },
  { date: "22/11", weight: 71.5 },
  { date: "29/11", weight: 71.2 },
  { date: "06/12", weight: 70.8 },
];

const mealPlan = {
  days: [
    {
      day: "Segunda-feira",
      meals: [
        { time: "07:00", name: "Café da manhã", foods: ["2 fatias pão integral", "2 ovos mexidos", "1 copo suco laranja"] },
        { time: "10:00", name: "Lanche", foods: ["1 maçã", "5 castanhas"] },
        { time: "12:30", name: "Almoço", foods: ["150g arroz integral", "100g feijão", "150g frango grelhado", "Salada à vontade"] },
        { time: "16:00", name: "Lanche", foods: ["Iogurte natural", "30g granola"] },
        { time: "19:30", name: "Jantar", foods: ["150g peixe assado", "150g batata doce", "Legumes no vapor"] },
      ],
    },
    {
      day: "Terça-feira",
      meals: [
        { time: "07:00", name: "Café da manhã", foods: ["Overnight oats", "Frutas vermelhas"] },
        { time: "10:00", name: "Lanche", foods: ["1 banana", "1 colher pasta amendoim"] },
        { time: "12:30", name: "Almoço", foods: ["150g macarrão integral", "Molho de tomate caseiro", "100g carne moída magra"] },
        { time: "16:00", name: "Lanche", foods: ["Vitamina de frutas"] },
        { time: "19:30", name: "Jantar", foods: ["Omelete de legumes", "Salada verde"] },
      ],
    },
  ],
  notes: "Beber pelo menos 2L de água por dia. Evitar alimentos processados. Substituições permitidas conforme lista anexa.",
};

const checkIns = [
  { date: "06/12/2024", weight: 70.8, waist: 82, notes: "Sentindo-se bem, energia alta" },
  { date: "29/11/2024", weight: 71.2, waist: 83, notes: "Semana difícil, alguns deslizes" },
  { date: "22/11/2024", weight: 71.5, waist: 83.5, notes: "Mantendo a dieta" },
  { date: "15/11/2024", weight: 71.8, waist: 84, notes: "Início do acompanhamento" },
];

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("diario");

  // Mock patient data
  const patient = {
    id,
    name: "Maria Silva",
    avatar: "",
    age: 32,
    goal: "Emagrecimento",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/nutricionista/pacientes")}
          className="p-2 rounded-lg hover:bg-card transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold font-poppins text-xl">
            {patient.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground font-poppins">{patient.name}</h1>
            <p className="text-sm text-muted-foreground font-poppins">
              {patient.age} anos • {patient.goal}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-card rounded-xl border border-border p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-poppins text-sm",
              activeTab === tab.id
                ? "gradient-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-background"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === "diario" && (
          <div className="space-y-6">
            {/* Calories Summary */}
            <CaloriesChart
              consumed={1970}
              goal={2200}
              carbs={{ value: 242, goal: 280 }}
              protein={{ value: 104, goal: 120 }}
              fat={{ value: 65, goal: 70 }}
            />

            {/* Meals */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground font-poppins">Refeições de hoje</h3>
              {mockMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>

            {/* Weight Mini Chart */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground font-poppins">Evolução do peso</h3>
                <button
                  onClick={() => setActiveTab("evolucao")}
                  className="text-sm text-primary font-medium font-poppins hover:underline"
                >
                  Ver completo →
                </button>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontFamily: 'Poppins',
                      }}
                      formatter={(value: number) => [`${value} kg`, 'Peso']}
                    />
                    <Line type="monotone" dataKey="weight" stroke="hsl(157, 100%, 38%)" strokeWidth={2} dot={{ fill: 'hsl(157, 100%, 38%)', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === "plano" && (
          <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h3 className="font-semibold text-foreground font-poppins mb-6">Plano Alimentar</h3>
              <div className="space-y-6">
                {mealPlan.days.map((day, index) => (
                  <div key={index} className="border-b border-border pb-6 last:border-0 last:pb-0">
                    <h4 className="font-medium text-foreground font-poppins mb-4">{day.day}</h4>
                    <div className="space-y-3">
                      {day.meals.map((meal, mealIndex) => (
                        <div key={mealIndex} className="flex gap-4 p-3 bg-background rounded-lg">
                          <div className="w-16 h-8 gradient-primary rounded-md flex items-center justify-center">
                            <span className="text-xs font-medium text-primary-foreground font-poppins">{meal.time}</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground font-poppins text-sm">{meal.name}</p>
                            <ul className="text-sm text-muted-foreground font-poppins mt-1 space-y-0.5">
                              {meal.foods.map((food, foodIndex) => (
                                <li key={foodIndex}>• {food}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-foreground font-poppins mb-1">Observações</p>
                <p className="text-sm text-muted-foreground font-poppins">{mealPlan.notes}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "evolucao" && (
          <div className="space-y-6">
            <EvolutionCharts />
          </div>
        )}

        {activeTab === "checkins" && (
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800 font-poppins">
                ⚠️ Já se passaram 6 dias desde o último check-in deste paciente. Considere atualizar peso, medidas ou ajustar o plano.
              </p>
            </div>
            {checkIns.map((checkIn, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-5 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground font-poppins">{checkIn.date}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="p-3 bg-background rounded-lg">
                    <p className="text-xs text-muted-foreground font-poppins">Peso</p>
                    <p className="font-semibold text-foreground font-poppins">{checkIn.weight} kg</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <p className="text-xs text-muted-foreground font-poppins">Cintura</p>
                    <p className="font-semibold text-foreground font-poppins">{checkIn.waist} cm</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-poppins">{checkIn.notes}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Evolution Charts Component
const EvolutionCharts = () => {
  const [period, setPeriod] = useState<"7D" | "30D" | "90D" | "1Y" | "custom">("30D");

  const caloriesData = [
    { date: "01/11", consumed: 2100, goal: 2200 },
    { date: "08/11", consumed: 2050, goal: 2200 },
    { date: "15/11", consumed: 2180, goal: 2200 },
    { date: "22/11", consumed: 1950, goal: 2200 },
    { date: "29/11", consumed: 2020, goal: 2200 },
    { date: "06/12", consumed: 1970, goal: 2200 },
  ];

  return (
    <div className="space-y-6">
      {/* Period Filter */}
      <div className="flex gap-2 bg-card rounded-lg border border-border p-1.5 w-fit">
        {["7D", "30D", "90D", "1Y", "custom"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p as typeof period)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 font-poppins",
              period === p
                ? "gradient-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {p === "custom" ? "Personalizado" : p}
          </button>
        ))}
      </div>

      {/* Weight Chart */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <h3 className="font-semibold text-foreground font-poppins mb-4">Evolução do Peso</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontFamily: 'Poppins',
                }}
                formatter={(value: number) => [`${value} kg`, 'Peso']}
              />
              <Line type="monotone" dataKey="weight" stroke="hsl(157, 100%, 38%)" strokeWidth={3} dot={{ fill: 'hsl(157, 100%, 38%)', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Calories Chart */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <h3 className="font-semibold text-foreground font-poppins mb-4">Calorias Ingeridas vs Meta</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={caloriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontFamily: 'Poppins',
                }}
              />
              <Line type="monotone" dataKey="consumed" name="Consumido" stroke="hsl(157, 100%, 38%)" strokeWidth={3} dot={{ fill: 'hsl(157, 100%, 38%)', r: 4 }} />
              <Line type="monotone" dataKey="goal" name="Meta" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
