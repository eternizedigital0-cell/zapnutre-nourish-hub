import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { cn } from "@/lib/utils";
import { Flame, Wheat, Drumstick, Droplet, TrendingDown } from "lucide-react";

type Period = "24H" | "3D" | "7D" | "1M" | "custom";

const periods: { value: Period; label: string }[] = [
  { value: "24H", label: "24H" },
  { value: "3D", label: "3D" },
  { value: "7D", label: "7D" },
  { value: "1M", label: "1M" },
  { value: "custom", label: "Personalizado" },
];

const chartData = [
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

const Reports = () => {
  const [period, setPeriod] = useState<Period>("7D");
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

  const dataWithBalance = chartData.map(d => ({
    ...d,
    balance: d.burned - d.calories,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-poppins">Relatórios</h1>
        <p className="text-muted-foreground font-poppins">Análise detalhada dos dados nutricionais</p>
      </div>

      {/* Period Filter */}
      <div className="flex gap-2 bg-card rounded-lg border border-border p-1.5 w-fit">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 font-poppins",
              period === p.value
                ? "gradient-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

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

export default Reports;
