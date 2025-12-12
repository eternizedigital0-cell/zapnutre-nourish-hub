import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Home, BookOpen, Utensils, TrendingUp, ClipboardCheck, Settings, LogOut } from "lucide-react";
import logo from "@/assets/logo-zapnutre.png";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/paciente/home", label: "Home", icon: Home },
  { path: "/paciente/diario", label: "Diário", icon: BookOpen },
  { path: "/paciente/plano", label: "Plano", icon: Utensils },
  { path: "/paciente/evolucao", label: "Evolução", icon: TrendingUp },
  { path: "/paciente/checkins", label: "Check-ins", icon: ClipboardCheck },
  { path: "/paciente/configuracoes", label: "Configurações", icon: Settings },
];

const PatientLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ZapNutre" className="w-10 h-10" />
            <span className="font-semibold text-lg text-foreground font-poppins">ZapNutre</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-poppins text-sm",
                  isActive
                    ? "gradient-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 font-poppins text-sm"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout;
