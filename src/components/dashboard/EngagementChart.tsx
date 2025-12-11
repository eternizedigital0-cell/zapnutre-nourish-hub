import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

type Period = "weekly" | "monthly" | "30days";

const weeklyData = [
  { name: "Sem 1", engagement: 65 },
  { name: "Sem 2", engagement: 72 },
  { name: "Sem 3", engagement: 68 },
  { name: "Sem 4", engagement: 78 },
  { name: "Sem 5", engagement: 82 },
  { name: "Sem 6", engagement: 75 },
];

const monthlyData = [
  { name: "Jan", engagement: 60 },
  { name: "Fev", engagement: 65 },
  { name: "Mar", engagement: 70 },
  { name: "Abr", engagement: 68 },
  { name: "Mai", engagement: 75 },
  { name: "Jun", engagement: 80 },
];

const thirtyDaysData = Array.from({ length: 30 }, (_, i) => ({
  name: `${i + 1}`,
  engagement: Math.floor(Math.random() * 30) + 60,
}));

const periods: { value: Period; label: string }[] = [
  { value: "weekly", label: "Semanal" },
  { value: "30days", label: "30 dias" },
  { value: "monthly", label: "Mensal" },
];

const EngagementChart = () => {
  const [period, setPeriod] = useState<Period>("weekly");

  const data = period === "weekly" ? weeklyData : period === "monthly" ? monthlyData : thirtyDaysData;
  const lastValue = data[data.length - 1].engagement;
  const engagedPatients = Math.round((lastValue / 100) * 24);

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground font-poppins">Engajamento</h3>
        <div className="flex gap-1 bg-background rounded-lg p-1">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 font-poppins",
                period === p.value
                  ? "gradient-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontFamily: 'Poppins',
              }}
              formatter={(value: number) => [`${value}%`, 'Engajamento']}
            />
            <Line
              type="monotone"
              dataKey="engagement"
              stroke="hsl(157, 100%, 38%)"
              strokeWidth={3}
              dot={{ fill: 'hsl(157, 100%, 38%)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: 'hsl(157, 100%, 34%)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground font-poppins">
          Engajamento da última semana: <span className="font-semibold text-foreground">{lastValue}%</span>
        </p>
        <p className="text-sm text-muted-foreground font-poppins">
          Pacientes engajados: <span className="font-semibold text-foreground">{engagedPatients} de 24</span>
        </p>
      </div>
    </div>
  );
};

export default EngagementChart;
