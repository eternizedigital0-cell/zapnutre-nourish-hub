import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CheckInFormData {
  weight?: string;
  height?: string;
  waist?: string;
  abdomen?: string;
  hip?: string;
  chest?: string;
  rightArm?: string;
  leftArm?: string;
  rightThigh?: string;
  leftThigh?: string;
  rightCalf?: string;
  leftCalf?: string;
  bodyFatPercentage?: string;
  notes?: string;
}

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CheckInFormData) => void;
}

const measurementFields = [
  { key: "weight", label: "Peso", unit: "kg", placeholder: "70.5" },
  { key: "height", label: "Altura (opcional)", unit: "cm", placeholder: "175" },
];

const circumferenceFields = [
  { key: "waist", label: "Cintura", unit: "cm", placeholder: "82" },
  { key: "abdomen", label: "Abdômen", unit: "cm", placeholder: "85" },
  { key: "hip", label: "Quadril", unit: "cm", placeholder: "98" },
  { key: "chest", label: "Peito/Tórax", unit: "cm", placeholder: "95" },
  { key: "rightArm", label: "Braço direito", unit: "cm", placeholder: "32" },
  { key: "leftArm", label: "Braço esquerdo", unit: "cm", placeholder: "32" },
  { key: "rightThigh", label: "Coxa direita", unit: "cm", placeholder: "55" },
  { key: "leftThigh", label: "Coxa esquerda", unit: "cm", placeholder: "55" },
  { key: "rightCalf", label: "Panturrilha direita", unit: "cm", placeholder: "38" },
  { key: "leftCalf", label: "Panturrilha esquerda", unit: "cm", placeholder: "38" },
];

const CheckInModal = ({ isOpen, onClose, onSave }: CheckInModalProps) => {
  const [formData, setFormData] = useState<CheckInFormData>({});

  if (!isOpen) return null;

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    setFormData({});
    onClose();
  };

  const inputClasses = "w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card rounded-xl border border-border shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground font-poppins">Novo Check-in</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-background transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Measurements */}
          <div>
            <h3 className="font-medium text-foreground font-poppins mb-3">Medidas Básicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {measurementFields.map((field) => (
                <div key={field.key}>
                  <label className="text-sm font-medium text-foreground font-poppins">
                    {field.label} ({field.unit})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof CheckInFormData] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className={cn(inputClasses, "mt-1.5")}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Circumferences */}
          <div>
            <h3 className="font-medium text-foreground font-poppins mb-3">Circunferências</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {circumferenceFields.map((field) => (
                <div key={field.key}>
                  <label className="text-sm font-medium text-foreground font-poppins">
                    {field.label} ({field.unit})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof CheckInFormData] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className={cn(inputClasses, "mt-1.5")}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Body Fat */}
          <div>
            <h3 className="font-medium text-foreground font-poppins mb-3">Composição Corporal</h3>
            <div className="w-full md:w-1/2">
              <label className="text-sm font-medium text-foreground font-poppins">
                Percentual de gordura (%)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="18.5"
                value={formData.bodyFatPercentage || ""}
                onChange={(e) => handleChange("bodyFatPercentage", e.target.value)}
                className={cn(inputClasses, "mt-1.5")}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="font-medium text-foreground font-poppins mb-3">Observações Gerais</h3>
            <textarea
              rows={3}
              placeholder="Como você está se sentindo? Alguma observação importante?"
              value={formData.notes || ""}
              onChange={(e) => handleChange("notes", e.target.value)}
              className={cn(inputClasses, "resize-none")}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="font-poppins">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="font-poppins">
            Salvar Check-in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;
