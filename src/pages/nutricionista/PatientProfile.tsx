import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Utensils, TrendingUp, ClipboardCheck, FileText, Flame, Wheat, Drumstick, Droplet, TrendingDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import CaloriesChart from "@/components/dashboard/CaloriesChart";
import MealCard from "@/components/meals/MealCard";
import PeriodSelector, { Period } from "@/components/shared/PeriodSelector";
import CheckInModal from "@/components/shared/CheckInModal";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const tabs = [
  { id: "diario", label: "Diário", icon: BookOpen },
  { id: "plano", label: "Plano", icon: Utensils },
  { id: "evolucao", label: "Evolução", icon: TrendingUp },
  { id: "relatorio", label: "Relatório", icon: FileText },
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
  { date: "06/12/2024", weight: 70.8, waist: 82, hip: 98, abdomen: 84, chest: 95, bodyFat: 18.5, notes: "Sentindo-se bem, energia alta" },
  { date: "29/11/2024", weight: 71.2, waist: 83, hip: 98.5, abdomen: 85, chest: 95, bodyFat: 19.2, notes: "Semana difícil, alguns deslizes" },
  { date: "22/11/2024", weight: 71.5, waist: 83.5, hip: 99, abdomen: 85.5, chest: 95, bodyFat: 19.5, notes: "Mantendo a dieta" },
  { date: "15/11/2024", weight: 71.8, waist: 84, hip: 99, abdomen: 86, chest: 95.5, bodyFat: 20.0, notes: "Início do acompanhamento" },
];

// Report chart data
const reportChartData = [
  { date: "01/12", calories: 2100, burned: 2300, protein: 95, carbs: 220, fat: 65 },
  { date: "02/12", calories: 1950, burned: 2250, protein: 105, carbs: 195, fat: 60 },
  { date: "03/12", calories: 2200, burned: 2400, protein: 110, carbs: 230, fat: 70 },
  { date: "04/12", calories: 1850, burned: 2350, protein: 100, carbs: 180, fat: 55 },
  { date: "05/12", calories: 2050, burned: 2300, protein: 108, carbs: 210, fat: 62 },
  { date: "06/12", calories: 1970, burned: 2280, protein: 104, carbs: 200, fat: 58 },
  { date: "07/12", calories: 2150, burned: 2350, protein: 115, carbs: 225, fat: 68 },
];

const summaryCards = [
  { label: "Proteína média por dia", value: "52g", icon: Drumstick, color: "text-amber-600", bgColor: "bg-amber-50" },
  { label: "Carbo médio por dia", value: "195g", icon: Wheat, color: "text-green-600", bgColor: "bg-green-50" },
  { label: "Gordura média por dia", value: "36g", icon: Droplet, color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Déficit calórico total", value: "-8129kcal", icon: TrendingDown, color: "text-purple-600", bgColor: "bg-purple-50" },
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
      <div className="flex gap-2 bg-card rounded-xl border border-border p-1.5 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-poppins text-sm whitespace-nowrap",
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
              showGoals={true}
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

        {activeTab === "relatorio" && (
          <div className="space-y-6">
            <NutritionalReport />
          </div>
        )}

        {activeTab === "checkins" && (
          <div className="space-y-4">
            <CheckInsTab />
          </div>
        )}
      </div>
    </div>
  );
};

// Check-ins Tab Component
const CheckInsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveCheckIn = (data: any) => {
    console.log("Check-in saved:", data);
    // In a real app, this would save to the database
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground font-poppins">Histórico de Check-ins</h3>
        <Button onClick={() => setIsModalOpen(true)} className="font-poppins">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Check-in
        </Button>
      </div>

      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-800 font-poppins">
          ⚠️ Já se passaram 6 dias desde o último check-in deste paciente. Considere atualizar peso, medidas ou ajustar o plano.
        </p>
      </div>

      {checkIns.map((checkIn, index) => (
        <div key={index} className="bg-card rounded-xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-foreground font-poppins">{checkIn.date}</span>
            {index === 0 && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary font-poppins">
                Mais recente
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
            <div className="p-3 bg-background rounded-lg">
              <p className="text-xs text-muted-foreground font-poppins">Peso</p>
              <p className="font-semibold text-foreground font-poppins">{checkIn.weight} kg</p>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <p className="text-xs text-muted-foreground font-poppins">Cintura</p>
              <p className="font-semibold text-foreground font-poppins">{checkIn.waist} cm</p>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <p className="text-xs text-muted-foreground font-poppins">Quadril</p>
              <p className="font-semibold text-foreground font-poppins">{checkIn.hip} cm</p>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <p className="text-xs text-muted-foreground font-poppins">% Gordura</p>
              <p className="font-semibold text-foreground font-poppins">{checkIn.bodyFat}%</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground font-poppins">{checkIn.notes}</p>
        </div>
      ))}

      <CheckInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCheckIn}
      />
    </>
  );
};

// Evolution Charts Component
const EvolutionCharts = () => {
  const [period, setPeriod] = useState<Period>("30D");
  const [customDateRange, setCustomDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  const caloriesData = [
    { date: "01/11", consumed: 2100, goal: 2200 },
    { date: "08/11", consumed: 2050, goal: 2200 },
    { date: "15/11", consumed: 2180, goal: 2200 },
    { date: "22/11", consumed: 1950, goal: 2200 },
    { date: "29/11", consumed: 2020, goal: 2200 },
    { date: "06/12", consumed: 1970, goal: 2200 },
  ];

  const evolutionPeriods: { value: Period; label: string }[] = [
    { value: "7D", label: "7D" },
    { value: "30D", label: "30D" },
    { value: "90D", label: "90D" },
    { value: "custom", label: "Personalizado" },
  ];

  return (
    <div className="space-y-6">
      {/* Period Filter */}
      <PeriodSelector
        period={period}
        onPeriodChange={setPeriod}
        customDateRange={customDateRange}
        onCustomDateChange={setCustomDateRange}
        periods={evolutionPeriods}
      />

      {/* Weight Chart */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <h3 className="font-semibold text-foreground font-poppins mb-4">Evolução do Peso</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-background rounded-lg text-center">
            <p className="text-xs text-muted-foreground font-poppins">Peso inicial</p>
            <p className="text-xl font-bold text-foreground font-poppins">72.5 kg</p>
          </div>
          <div className="p-4 bg-background rounded-lg text-center">
            <p className="text-xs text-muted-foreground font-poppins">Peso atual</p>
            <p className="text-xl font-bold text-primary font-poppins">70.8 kg</p>
          </div>
          <div className="p-4 bg-background rounded-lg text-center">
            <p className="text-xs text-muted-foreground font-poppins">Perdido</p>
            <p className="text-xl font-bold text-primary font-poppins">-1.7 kg</p>
          </div>
        </div>
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

// Nutritional Report Component
const NutritionalReport = () => {
  const [period, setPeriod] = useState<Period>("7D");
  const [customDateRange, setCustomDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [visibleLines, setVisibleLines] = useState({
    calories: true,
    burned: true,
    balance: true,
    protein: false,
    carbs: false,
  });

  const toggleLine = (line: keyof typeof visibleLines) => {
    setVisibleLines(prev => ({ ...prev, [line]: !prev[line] }));
  };

  const dataWithBalance = reportChartData.map(d => ({
    ...d,
    balance: d.burned - d.calories,
  }));

  return (
    <div className="space-y-6">
      {/* Period Filter */}
      <PeriodSelector
        period={period}
        onPeriodChange={setPeriod}
        customDateRange={customDateRange}
        onCustomDateChange={setCustomDateRange}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-card rounded-xl border border-border p-5 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", card.bgColor)}>
                <card.icon className={cn("w-5 h-5", card.color)} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-poppins">{card.label}</p>
            <p className="text-2xl font-bold text-foreground font-poppins">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="font-semibold text-foreground font-poppins">Visão Geral</h3>
          
          {/* Line Toggles */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => toggleLine("calories")}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium font-poppins transition-all",
                visibleLines.calories ? "bg-primary/10 text-primary" : "bg-background text-muted-foreground"
              )}
            >
              <Flame className="w-3.5 h-3.5" />
              Calorias
            </button>
            <button
              onClick={() => toggleLine("burned")}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium font-poppins transition-all",
                visibleLines.burned ? "bg-orange-100 text-orange-600" : "bg-background text-muted-foreground"
              )}
            >
              + Calorias Gastas
            </button>
            <button
              onClick={() => toggleLine("balance")}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium font-poppins transition-all",
                visibleLines.balance ? "bg-blue-100 text-blue-600" : "bg-background text-muted-foreground"
              )}
            >
              + Saldo calórico
            </button>
            <button
              onClick={() => toggleLine("protein")}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium font-poppins transition-all",
                visibleLines.protein ? "bg-amber-100 text-amber-600" : "bg-background text-muted-foreground"
              )}
            >
              + Proteína
            </button>
            <button
              onClick={() => toggleLine("carbs")}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium font-poppins transition-all",
                visibleLines.carbs ? "bg-green-100 text-green-600" : "bg-background text-muted-foreground"
              )}
            >
              + Carbo
            </button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataWithBalance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontFamily: 'Poppins',
                }}
              />
              <Legend />
              {visibleLines.calories && (
                <Line
                  type="monotone"
                  dataKey="calories"
                  name="Calorias"
                  stroke="hsl(157, 100%, 38%)"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(157, 100%, 38%)', r: 4 }}
                />
              )}
              {visibleLines.burned && (
                <Line
                  type="monotone"
                  dataKey="burned"
                  name="Calorias Gastas"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ fill: '#f97316', r: 3 }}
                />
              )}
              {visibleLines.balance && (
                <Line
                  type="monotone"
                  dataKey="balance"
                  name="Saldo Calórico"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 3 }}
                />
              )}
              {visibleLines.protein && (
                <Line
                  type="monotone"
                  dataKey="protein"
                  name="Proteína (g)"
                  stroke="#d97706"
                  strokeWidth={2}
                  dot={{ fill: '#d97706', r: 3 }}
                />
              )}
              {visibleLines.carbs && (
                <Line
                  type="monotone"
                  dataKey="carbs"
                  name="Carboidratos (g)"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={{ fill: '#16a34a', r: 3 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
