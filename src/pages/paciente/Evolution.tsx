import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

type Period = "7D" | "30D" | "90D" | "1Y" | "custom";

const weightData = [
  { date: "01/11", weight: 72.5 },
  { date: "08/11", weight: 72.2 },
  { date: "15/11", weight: 71.8 },
  { date: "22/11", weight: 71.5 },
  { date: "29/11", weight: 71.2 },
  { date: "06/12", weight: 70.8 },
];

const caloriesData = [
  { date: "01/11", consumed: 2100, goal: 2200 },
  { date: "08/11", consumed: 2050, goal: 2200 },
  { date: "15/11", consumed: 2180, goal: 2200 },
  { date: "22/11", consumed: 1950, goal: 2200 },
  { date: "29/11", consumed: 2020, goal: 2200 },
  { date: "06/12", consumed: 1970, goal: 2200 },
];

const PatientEvolution = () => {
  const [period, setPeriod] = useState<Period>("30D");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-poppins">Minha Evolução</h1>
        <p className="text-muted-foreground font-poppins">Acompanhe seu progresso</p>
      </div>

      {/* Period Filter */}
      <div className="flex gap-2 bg-card rounded-lg border border-border p-1.5 w-fit">
        {["7D", "30D", "90D", "1Y", "custom"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p as Period)}
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

export default PatientEvolution;
