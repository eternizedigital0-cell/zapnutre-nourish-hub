import { BookOpen, Utensils, TrendingUp, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import CaloriesChart from "@/components/dashboard/CaloriesChart";

const quickLinks = [
  { path: "/paciente/diario", label: "Diário", icon: BookOpen, color: "bg-primary/10 text-primary" },
  { path: "/paciente/plano", label: "Meu Plano", icon: Utensils, color: "bg-amber-50 text-amber-600" },
  { path: "/paciente/evolucao", label: "Evolução", icon: TrendingUp, color: "bg-blue-50 text-blue-600" },
  { path: "/paciente/checkins", label: "Check-ins", icon: ClipboardCheck, color: "bg-purple-50 text-purple-600" },
];

const PatientHome = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-poppins">Olá, Maria!</h1>
        <p className="text-muted-foreground font-poppins">Veja seu resumo de hoje</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-hover transition-all duration-300 hover:border-primary/30 group"
          >
            <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
              <link.icon className="w-6 h-6" />
            </div>
            <p className="font-medium text-foreground font-poppins group-hover:text-primary transition-colors">{link.label}</p>
          </Link>
        ))}
      </div>

      {/* Today's Summary */}
      <CaloriesChart
        consumed={1450}
        goal={2200}
        carbs={{ value: 165, goal: 280 }}
        protein={{ value: 78, goal: 120 }}
        fat={{ value: 42, goal: 70 }}
      />

      {/* Tips */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <h3 className="font-semibold text-foreground font-poppins mb-3">Dica do dia</h3>
        <p className="text-muted-foreground font-poppins text-sm">
          Lembre-se de beber pelo menos 2 litros de água ao longo do dia. A hidratação adequada ajuda no metabolismo e na saciedade.
        </p>
      </div>
    </div>
  );
};

export default PatientHome;
