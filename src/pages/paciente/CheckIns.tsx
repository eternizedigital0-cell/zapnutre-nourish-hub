import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const checkIns = [
  { date: "06/12/2024", weight: 70.8, waist: 82, hip: 98, notes: "Sentindo-se bem, energia alta" },
  { date: "29/11/2024", weight: 71.2, waist: 83, hip: 98.5, notes: "Semana difícil, alguns deslizes" },
  { date: "22/11/2024", weight: 71.5, waist: 83.5, hip: 99, notes: "Mantendo a dieta" },
  { date: "15/11/2024", weight: 71.8, waist: 84, hip: 99, notes: "Início do acompanhamento" },
];

const PatientCheckIns = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-poppins">Check-ins</h1>
          <p className="text-muted-foreground font-poppins">Registre seu progresso</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="font-poppins">
          <Plus className="w-4 h-4 mr-2" />
          Novo check-in
        </Button>
      </div>

      {/* New Check-in Form */}
      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6 shadow-card animate-scale-in">
          <h3 className="font-semibold text-foreground font-poppins mb-4">Novo Check-in</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-foreground font-poppins">Peso (kg)</label>
              <input
                type="number"
                step="0.1"
                placeholder="70.5"
                className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-lg text-foreground font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground font-poppins">Cintura (cm)</label>
              <input
                type="number"
                placeholder="82"
                className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-lg text-foreground font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground font-poppins">Quadril (cm)</label>
              <input
                type="number"
                placeholder="98"
                className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-lg text-foreground font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-foreground font-poppins">Observações</label>
            <textarea
              rows={3}
              placeholder="Como você está se sentindo?"
              className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-lg text-foreground font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>
          <div className="flex gap-3">
            <Button className="font-poppins">Salvar check-in</Button>
            <Button variant="outline" onClick={() => setShowForm(false)} className="font-poppins">Cancelar</Button>
          </div>
        </div>
      )}

      {/* Check-ins List */}
      <div className="space-y-4">
        {checkIns.map((checkIn, index) => (
          <div key={index} className="bg-card rounded-xl border border-border p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-foreground font-poppins">{checkIn.date}</span>
              {index === 0 && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary font-poppins">
                  Mais recente
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="p-3 bg-background rounded-lg">
                <p className="text-xs text-muted-foreground font-poppins">Peso</p>
                <p className="font-semibold text-foreground font-poppins">{checkIn.weight} kg</p>
              </div>
              <div className="p-3 bg-background rounded-lg">
                <p className="text-xs text-muted-foreground font-poppins">Cintura</p>
                <p className="font-semibold text-foreground font-poppins">{checkIn.waist} cm</p>
              </div>
              <div className="p-3 bg-background rounded-lg">
                <p className="text-xs text-muted-foreground font-poppins">Quadril</p>
                <p className="font-semibold text-foreground font-poppins">{checkIn.hip} cm</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-poppins">{checkIn.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientCheckIns;
