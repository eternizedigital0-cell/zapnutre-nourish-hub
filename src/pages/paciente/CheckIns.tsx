import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CheckInModal from "@/components/shared/CheckInModal";

const checkIns = [
  { date: "06/12/2024", weight: 70.8, waist: 82, hip: 98, abdomen: 84, chest: 95, bodyFat: 18.5, notes: "Sentindo-se bem, energia alta" },
  { date: "29/11/2024", weight: 71.2, waist: 83, hip: 98.5, abdomen: 85, chest: 95, bodyFat: 19.2, notes: "Semana difícil, alguns deslizes" },
  { date: "22/11/2024", weight: 71.5, waist: 83.5, hip: 99, abdomen: 85.5, chest: 95, bodyFat: 19.5, notes: "Mantendo a dieta" },
  { date: "15/11/2024", weight: 71.8, waist: 84, hip: 99, abdomen: 86, chest: 95.5, bodyFat: 20.0, notes: "Início do acompanhamento" },
];

const PatientCheckIns = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveCheckIn = (data: any) => {
    console.log("Check-in saved:", data);
    // In a real app, this would save to the database
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-poppins">Check-ins</h1>
          <p className="text-muted-foreground font-poppins">Registre seu progresso</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="font-poppins">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Check-in
        </Button>
      </div>

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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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
              <div className="p-3 bg-background rounded-lg">
                <p className="text-xs text-muted-foreground font-poppins">% Gordura</p>
                <p className="font-semibold text-foreground font-poppins">{checkIn.bodyFat}%</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-poppins">{checkIn.notes}</p>
          </div>
        ))}
      </div>

      <CheckInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCheckIn}
      />
    </div>
  );
};

export default PatientCheckIns;
