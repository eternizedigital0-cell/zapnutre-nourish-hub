import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type Period = "7D" | "14D" | "30D" | "60D" | "90D" | "custom";

interface PeriodSelectorProps {
  period: Period;
  onPeriodChange: (period: Period) => void;
  customDateRange?: { from: Date | undefined; to: Date | undefined };
  onCustomDateChange?: (range: { from: Date | undefined; to: Date | undefined }) => void;
  periods?: { value: Period; label: string }[];
}

const defaultPeriods: { value: Period; label: string }[] = [
  { value: "7D", label: "7 dias" },
  { value: "14D", label: "14 dias" },
  { value: "30D", label: "30 dias" },
  { value: "60D", label: "60 dias" },
  { value: "90D", label: "90 dias" },
  { value: "custom", label: "Personalizado" },
];

const PeriodSelector = ({
  period,
  onPeriodChange,
  customDateRange,
  onCustomDateChange,
  periods = defaultPeriods,
}: PeriodSelectorProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handlePeriodClick = (p: Period) => {
    onPeriodChange(p);
    if (p === "custom") {
      setIsCalendarOpen(true);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex gap-2 bg-card rounded-lg border border-border p-1.5 w-fit flex-wrap">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => handlePeriodClick(p.value)}
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 font-poppins whitespace-nowrap",
              period === p.value
                ? "gradient-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {period === "custom" && onCustomDateChange && (
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal font-poppins",
                !customDateRange?.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {customDateRange?.from ? (
                customDateRange.to ? (
                  <>
                    {format(customDateRange.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                    {format(customDateRange.to, "dd/MM/yyyy", { locale: ptBR })}
                  </>
                ) : (
                  format(customDateRange.from, "dd/MM/yyyy", { locale: ptBR })
                )
              ) : (
                <span>Selecione o período</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-card z-50" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={customDateRange?.from}
              selected={{ from: customDateRange?.from, to: customDateRange?.to }}
              onSelect={(range) => {
                onCustomDateChange({ from: range?.from, to: range?.to });
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
  );
};

export default PeriodSelector;
