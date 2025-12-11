import { Users, Activity, ClipboardCheck, AlertTriangle } from "lucide-react";
import SummaryCard from "@/components/dashboard/SummaryCard";
import AlertCard from "@/components/dashboard/AlertCard";
import EngagementChart from "@/components/dashboard/EngagementChart";
import { useNavigate } from "react-router-dom";

const mockAlerts = [
  {
    type: "low-engagement" as const,
    patientCount: 3,
    patients: [
      { id: "1", name: "Maria Silva" },
      { id: "2", name: "João Santos" },
      { id: "3", name: "Ana Costa" },
    ],
  },
  {
    type: "excess-calories" as const,
    patientCount: 2,
    patients: [
      { id: "4", name: "Pedro Lima" },
      { id: "5", name: "Carla Souza" },
    ],
  },
  {
    type: "goal-not-met" as const,
    patientCount: 1,
    patients: [{ id: "6", name: "Lucas Oliveira" }],
  },
  {
    type: "no-checkin" as const,
    patientCount: 2,
    patients: [
      { id: "7", name: "Fernanda Martins" },
      { id: "8", name: "Ricardo Alves" },
    ],
  },
];

const NutritionistDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-poppins">Dashboard</h1>
        <p className="text-muted-foreground font-poppins">Visão geral dos seus pacientes</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Pacientes ativos"
          value={24}
          icon={Users}
          trend={{ value: 8, label: "vs mês anterior" }}
        />
        <SummaryCard
          title="Engajamento da semana"
          value="78%"
          icon={Activity}
          trend={{ value: 5, label: "vs semana anterior" }}
        />
        <SummaryCard
          title="Últimos check-ins"
          value={12}
          icon={ClipboardCheck}
          trend={{ value: -3, label: "vs semana anterior" }}
        />
        <SummaryCard
          title="Alertas pendentes"
          value={8}
          icon={AlertTriangle}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Chart */}
        <div className="lg:col-span-2">
          <EngagementChart />
        </div>

        {/* Alerts */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-card">
          <h3 className="font-semibold text-foreground font-poppins mb-4">Alertas Inteligentes</h3>
          <div className="space-y-3">
            {mockAlerts.map((alert, index) => (
              <AlertCard
                key={index}
                alert={alert}
                onClick={() => navigate("/nutricionista/pacientes")}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground font-poppins mt-4 p-3 bg-background rounded-lg">
            💡 Recomendamos enviar uma mensagem aos pacientes com alertas para entender suas dificuldades.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NutritionistDashboard;
