import { AlertTriangle, TrendingDown, TrendingUp, Activity, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertType = "low-engagement" | "excess-calories" | "deficit-calories" | "goal-not-met" | "no-checkin";

interface Alert {
  type: AlertType;
  patientCount: number;
  patients: { id: string; name: string; avatar?: string }[];
}

interface AlertCardProps {
  alert: Alert;
  onClick: () => void;
}

const alertConfig: Record<AlertType, { icon: typeof AlertTriangle; label: string; color: string; bgColor: string }> = {
  "low-engagement": {
    icon: Activity,
    label: "Baixo engajamento",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  "excess-calories": {
    icon: TrendingUp,
    label: "Excesso de calorias",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  "deficit-calories": {
    icon: TrendingDown,
    label: "Déficit calórico",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  "goal-not-met": {
    icon: AlertTriangle,
    label: "Meta semanal não atingida",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  "no-checkin": {
    icon: Calendar,
    label: "30 dias sem check-in",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
  },
};

const AlertCard = ({ alert, onClick }: AlertCardProps) => {
  const config = alertConfig[alert.type];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-xl border border-border p-4 shadow-card hover:shadow-hover transition-all duration-300 hover:border-primary/30 text-left group"
    >
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.bgColor)}>
          <Icon className={cn("w-5 h-5", config.color)} />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground font-poppins text-sm group-hover:text-primary transition-colors">
            {config.label}
          </p>
          <p className="text-xs text-muted-foreground font-poppins">
            {alert.patientCount} {alert.patientCount === 1 ? "paciente" : "pacientes"}
          </p>
        </div>
      </div>
    </button>
  );
};

export default AlertCard;
