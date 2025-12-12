import { useState } from "react";
import { Search, Filter, AlertTriangle, Activity, TrendingUp, TrendingDown, Target, Calendar, X } from "lucide-react";
import PatientCard from "@/components/patients/PatientCard";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

type AlertType = "all" | "low-engagement" | "excess-calories" | "deficit-calories" | "weight-inconsistent" | "goal-not-met" | "no-checkin";

const alertFilters: { value: AlertType; label: string; icon: typeof AlertTriangle; color: string }[] = [
  { value: "low-engagement", label: "Baixo engajamento", icon: Activity, color: "text-amber-600" },
  { value: "excess-calories", label: "Excesso de calorias", icon: TrendingUp, color: "text-red-600" },
  { value: "deficit-calories", label: "Déficit calórico", icon: TrendingDown, color: "text-orange-600" },
  { value: "weight-inconsistent", label: "Peso inconsistente", icon: AlertTriangle, color: "text-purple-600" },
  { value: "goal-not-met", label: "Meta semanal não atingida", icon: Target, color: "text-yellow-600" },
  { value: "no-checkin", label: "30 dias sem check-in", icon: Calendar, color: "text-gray-600" },
];

const mockPatients = [
  { id: "1", name: "Maria Silva", lastCheckIn: "Hoje", status: "active" as const, engagement: 85, alerts: [] as AlertType[] },
  { id: "2", name: "João Santos", lastCheckIn: "Ontem", status: "active" as const, engagement: 72, alerts: [] as AlertType[] },
  { id: "3", name: "Ana Costa", lastCheckIn: "Há 3 dias", status: "warning" as const, engagement: 45, alerts: ["low-engagement"] as AlertType[] },
  { id: "4", name: "Pedro Lima", lastCheckIn: "Há 1 semana", status: "warning" as const, engagement: 30, alerts: ["low-engagement", "excess-calories"] as AlertType[] },
  { id: "5", name: "Carla Souza", lastCheckIn: "Hoje", status: "active" as const, engagement: 92, alerts: ["excess-calories"] as AlertType[] },
  { id: "6", name: "Lucas Oliveira", lastCheckIn: "Há 2 semanas", status: "inactive" as const, engagement: 15, alerts: ["low-engagement", "goal-not-met"] as AlertType[] },
  { id: "7", name: "Fernanda Martins", lastCheckIn: "Há 1 mês", status: "inactive" as const, engagement: 5, alerts: ["no-checkin", "low-engagement"] as AlertType[] },
  { id: "8", name: "Ricardo Alves", lastCheckIn: "Há 3 dias", status: "active" as const, engagement: 68, alerts: ["deficit-calories"] as AlertType[] },
  { id: "9", name: "Paula Mendes", lastCheckIn: "Há 5 dias", status: "warning" as const, engagement: 40, alerts: ["weight-inconsistent"] as AlertType[] },
];

const getAlertLabel = (alertType: AlertType): string => {
  const filter = alertFilters.find(f => f.value === alertType);
  return filter?.label || "";
};

const getAlertColor = (alertType: AlertType): string => {
  const filter = alertFilters.find(f => f.value === alertType);
  return filter?.color || "text-gray-600";
};

const PatientsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "warning" | "inactive">("all");
  const [alertFilter, setAlertFilter] = useState<AlertType>("all");

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    const matchesAlert = alertFilter === "all" || patient.alerts.includes(alertFilter);
    return matchesSearch && matchesStatus && matchesAlert;
  });

  const clearAlertFilter = () => setAlertFilter("all");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-poppins">Pacientes</h1>
        <p className="text-muted-foreground font-poppins">Gerencie seus pacientes</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-poppins text-sm"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
            <Filter className="w-4 h-4 text-muted-foreground ml-2" />
            {["all", "active", "warning", "inactive"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as typeof statusFilter)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 font-poppins capitalize ${
                  statusFilter === status
                    ? "gradient-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {status === "all" ? "Todos" : status === "active" ? "Ativos" : status === "warning" ? "Atenção" : "Inativos"}
              </button>
            ))}
          </div>
        </div>

        {/* Alert Filters */}
        <div className="bg-card rounded-xl border border-border p-4 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-foreground font-poppins text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-primary" />
              Filtrar por alerta
            </h3>
            {alertFilter !== "all" && (
              <button
                onClick={clearAlertFilter}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-poppins transition-colors"
              >
                <X className="w-3 h-3" />
                Limpar filtro
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {alertFilters.map((filter) => {
              const Icon = filter.icon;
              const isActive = alertFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => setAlertFilter(isActive ? "all" : filter.value)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium font-poppins transition-all border",
                    isActive
                      ? "gradient-primary text-primary-foreground border-transparent"
                      : "bg-background text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Patients List */}
      <div className="space-y-3">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="space-y-0">
            <PatientCard
              patient={patient}
              onClick={() => navigate(`/nutricionista/paciente/${patient.id}`)}
            />
            {/* Show alerts for this patient if alert filter is active */}
            {alertFilter !== "all" && patient.alerts.includes(alertFilter) && (
              <div className="ml-4 mt-1 mb-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className={cn("text-sm font-medium font-poppins", getAlertColor(alertFilter))}>
                  {getAlertLabel(alertFilter)}
                </p>
                <p className="text-xs text-muted-foreground font-poppins mt-1">
                  Recomendamos enviar uma mensagem a este paciente para entender se ele está enfrentando alguma dificuldade ou precisando de ajuda.
                </p>
              </div>
            )}
          </div>
        ))}
        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-poppins">Nenhum paciente encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsList;
