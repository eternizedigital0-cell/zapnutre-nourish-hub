import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    avatar?: string;
    lastCheckIn: string;
    status: "active" | "inactive" | "warning";
    engagement: number;
  };
  onClick: () => void;
}

const statusConfig = {
  active: { label: "Ativo", color: "bg-primary/10 text-primary" },
  inactive: { label: "Inativo", color: "bg-gray-100 text-gray-600" },
  warning: { label: "Atenção", color: "bg-amber-100 text-amber-600" },
};

const PatientCard = ({ patient, onClick }: PatientCardProps) => {
  const status = statusConfig[patient.status];

  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-xl border border-border p-4 shadow-card hover:shadow-hover transition-all duration-300 hover:border-primary/30 text-left group"
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold font-poppins text-lg">
          {patient.avatar ? (
            <img src={patient.avatar} alt={patient.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            patient.name.charAt(0).toUpperCase()
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground font-poppins truncate group-hover:text-primary transition-colors">
            {patient.name}
          </p>
          <p className="text-sm text-muted-foreground font-poppins">
            Último check-in: {patient.lastCheckIn}
          </p>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium font-poppins", status.color)}>
            {status.label}
          </span>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </button>
  );
};

export default PatientCard;
