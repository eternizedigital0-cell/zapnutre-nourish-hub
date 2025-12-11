import { useState } from "react";
import { Search, Filter } from "lucide-react";
import PatientCard from "@/components/patients/PatientCard";
import { useNavigate } from "react-router-dom";

const mockPatients = [
  { id: "1", name: "Maria Silva", lastCheckIn: "Hoje", status: "active" as const, engagement: 85 },
  { id: "2", name: "João Santos", lastCheckIn: "Ontem", status: "active" as const, engagement: 72 },
  { id: "3", name: "Ana Costa", lastCheckIn: "Há 3 dias", status: "warning" as const, engagement: 45 },
  { id: "4", name: "Pedro Lima", lastCheckIn: "Há 1 semana", status: "warning" as const, engagement: 30 },
  { id: "5", name: "Carla Souza", lastCheckIn: "Hoje", status: "active" as const, engagement: 92 },
  { id: "6", name: "Lucas Oliveira", lastCheckIn: "Há 2 semanas", status: "inactive" as const, engagement: 15 },
  { id: "7", name: "Fernanda Martins", lastCheckIn: "Há 1 mês", status: "inactive" as const, engagement: 5 },
  { id: "8", name: "Ricardo Alves", lastCheckIn: "Há 3 dias", status: "active" as const, engagement: 68 },
];

const PatientsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "warning" | "inactive">("all");

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-poppins">Pacientes</h1>
        <p className="text-muted-foreground font-poppins">Gerencie seus pacientes</p>
      </div>

      {/* Filters */}
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

      {/* Patients List */}
      <div className="space-y-3">
        {filteredPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onClick={() => navigate(`/nutricionista/paciente/${patient.id}`)}
          />
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
