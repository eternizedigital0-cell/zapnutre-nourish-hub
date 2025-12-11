import { User, Bell, Lock, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-poppins">Configurações</h1>
        <p className="text-muted-foreground font-poppins">Gerencie suas preferências</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* Profile Section */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground font-poppins">Perfil</h3>
              <p className="text-sm text-muted-foreground font-poppins">Informações pessoais</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground font-poppins">Nome completo</label>
              <input
                type="text"
                defaultValue="Dr. Carlos Mendes"
                className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-lg text-foreground font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground font-poppins">Email</label>
              <input
                type="email"
                defaultValue="carlos.mendes@email.com"
                className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-lg text-foreground font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground font-poppins">CRN</label>
              <input
                type="text"
                defaultValue="CRN-3 12345"
                className="w-full mt-1.5 px-4 py-2.5 bg-background border border-border rounded-lg text-foreground font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Bell className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground font-poppins">Notificações</h3>
              <p className="text-sm text-muted-foreground font-poppins">Preferências de alerta</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: "Alertas de baixo engajamento", checked: true },
              { label: "Novos check-ins", checked: true },
              { label: "Metas não atingidas", checked: false },
              { label: "Resumo semanal por email", checked: true },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <span className="text-sm text-foreground font-poppins">{item.label}</span>
                <button
                  className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                    item.checked ? "bg-primary" : "bg-border"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-card rounded-full shadow transition-transform duration-200 ${
                      item.checked ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Lock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground font-poppins">Segurança</h3>
              <p className="text-sm text-muted-foreground font-poppins">Senha e acesso</p>
            </div>
          </div>
          <Button variant="outline" className="font-poppins">
            Alterar senha
          </Button>
        </div>

        {/* Save Button */}
        <Button size="lg" className="w-full font-poppins">
          Salvar alterações
        </Button>
      </div>
    </div>
  );
};

export default Settings;
