import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Period = "weekly" | "monthly" | "30days" | "custom";

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
  { value: "custom", label: "Personalizado" },
];

const EngagementChart = () => {
  const [period, setPeriod] = useState<Period>("weekly");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  const handlePeriodClick = (p: Period) => {
    setPeriod(p);
    if (p === "custom") {
      setIsCalendarOpen(true);
    }
  };

  const data = period === "weekly" ? weeklyData : period === "monthly" ? monthlyData : thirtyDaysData;
  const lastValue = data[data.length - 1].engagement;
  const engagedPatients = Math.round((lastValue / 100) * 24);

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="font-semibold text-foreground font-poppins">Engajamento</h3>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-1 bg-background rounded-lg p-1 flex-wrap">
            {periods.map((p) => (
              <button
                key={p.value}
                onClick={() => handlePeriodClick(p.value)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 font-poppins whitespace-nowrap",
                  period === p.value
                    ? "gradient-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          {period === "custom" && (
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "justify-start text-left font-normal font-poppins text-xs",
                    !customDateRange?.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-3 w-3" />
                  {customDateRange?.from ? (
                    customDateRange.to ? (
                      <>
                        {format(customDateRange.from, "dd/MM", { locale: ptBR })} -{" "}
                        {format(customDateRange.to, "dd/MM", { locale: ptBR })}
                      </>
                    ) : (
                      format(customDateRange.from, "dd/MM/yyyy", { locale: ptBR })
                    )
                  ) : (
                    <span>Período</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-card z-50" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={customDateRange?.from}
                  selected={{ from: customDateRange?.from, to: customDateRange?.to }}
                  onSelect={(range) => {
                    setCustomDateRange({ from: range?.from, to: range?.to });
                    if (range?.from && range?.to) {
                      setIsCalendarOpen(false);
                    }
                  }}
                  numberOfMonths={2}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          )}
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
