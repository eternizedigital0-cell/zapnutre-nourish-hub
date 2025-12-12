import { useState } from "react";
import { Users, Activity, ClipboardCheck, AlertTriangle, X, ChevronRight } from "lucide-react";
import SummaryCard from "@/components/dashboard/SummaryCard";
import AlertCard from "@/components/dashboard/AlertCard";
import EngagementChart from "@/components/dashboard/EngagementChart";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

type AlertType = "low-engagement" | "excess-calories" | "deficit-calories" | "goal-not-met" | "no-checkin";

interface AlertPatient {
  id: string;
  name: string;
}

interface Alert {
  type: AlertType;
  patientCount: number;
  patients: AlertPatient[];
}

const mockAlerts: Alert[] = [
  {
    type: "low-engagement",
    patientCount: 3,
    patients: [
      { id: "3", name: "Ana Costa" },
      { id: "4", name: "Pedro Lima" },
      { id: "6", name: "Lucas Oliveira" },
    ],
  },
  {
    type: "excess-calories",
    patientCount: 2,
    patients: [
      { id: "4", name: "Pedro Lima" },
      { id: "5", name: "Carla Souza" },
    ],
  },
  {
    type: "goal-not-met",
    patientCount: 1,
    patients: [{ id: "6", name: "Lucas Oliveira" }],
  },
  {
    type: "no-checkin",
    patientCount: 2,
    patients: [
      { id: "7", name: "Fernanda Martins" },
      { id: "8", name: "Ricardo Alves" },
    ],
  },
];

const alertLabels: Record<AlertType, string> = {
  "low-engagement": "Baixo engajamento",
  "excess-calories": "Excesso de calorias",
  "deficit-calories": "Déficit calórico",
  "goal-not-met": "Meta semanal não atingida",
  "no-checkin": "30 dias sem check-in",
};

const NutritionistDashboard = () => {
  const navigate = useNavigate();
  const [expandedAlert, setExpandedAlert] = useState<AlertType | null>(null);

  const handleAlertClick = (alert: Alert) => {
    if (alert.patientCount === 1) {
      // Single patient - go directly to profile
      navigate(`/nutricionista/paciente/${alert.patients[0].id}`);
    } else {
      // Multiple patients - expand/collapse list
      setExpandedAlert(expandedAlert === alert.type ? null : alert.type);
    }
  };

  const handlePatientClick = (patientId: string) => {
    navigate(`/nutricionista/paciente/${patientId}`);
  };

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
              <div key={index}>
                <AlertCard
                  alert={alert}
                  onClick={() => handleAlertClick(alert)}
                />
                
                {/* Expanded patient list */}
                {expandedAlert === alert.type && alert.patientCount > 1 && (
                  <div className="mt-2 ml-2 bg-background rounded-lg border border-border p-3 animate-fade-in">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground font-poppins">
                        Pacientes afetados
                      </span>
                      <button
                        onClick={() => setExpandedAlert(null)}
                        className="p-1 hover:bg-card rounded transition-colors"
                      >
                        <X className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {alert.patients.map((patient) => (
                        <button
                          key={patient.id}
                          onClick={() => handlePatientClick(patient.id)}
                          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-card transition-colors group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold font-poppins text-xs">
                              {patient.name.charAt(0)}
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-medium text-foreground font-poppins group-hover:text-primary transition-colors">
                                {patient.name}
                              </p>
                              <p className="text-xs text-muted-foreground font-poppins">
                                {alertLabels[alert.type]}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground font-poppins">
                        💡 Recomendamos enviar uma mensagem a este paciente para entender se ele está enfrentando alguma dificuldade ou precisando de ajuda.
                      </p>
                    </div>
                  </div>
                )}
              </div>
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
