import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo-zapnutre.png";
import { User, Stethoscope } from "lucide-react";

const ProfileSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo and Header */}
        <div className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <img 
              src={logo} 
              alt="ZapNutre Logo" 
              className="w-28 h-28 object-contain animate-scale-in"
            />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2 font-poppins">
            ZapNutre
          </h1>
          <p className="text-muted-foreground font-poppins">
            Sistema de gestão nutricional
          </p>
        </div>

        {/* Profile Cards */}
        <div className="space-y-4">
          {/* Nutritionist Card */}
          <button
            onClick={() => navigate("/nutricionista/dashboard")}
            className="w-full bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:border-primary/30 group animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Stethoscope className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-semibold text-foreground font-poppins">
                  Sou Nutricionista
                </h2>
                <p className="text-sm text-muted-foreground font-poppins">
                  Acesse o painel profissional
                </p>
              </div>
            </div>
          </button>

          {/* Patient Card */}
          <button
            onClick={() => navigate("/paciente/home")}
            className="w-full bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:border-primary/30 group animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <User className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-semibold text-foreground font-poppins">
                  Sou Paciente
                </h2>
                <p className="text-sm text-muted-foreground font-poppins">
                  Veja seu diário e plano alimentar
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-12 font-poppins animate-fade-in" style={{ animationDelay: "0.4s" }}>
          © 2024 ZapNutre. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default ProfileSelection;
