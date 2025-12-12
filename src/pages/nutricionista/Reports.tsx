import EngagementChart from "@/components/dashboard/EngagementChart";

const Reports = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-poppins">Relatórios</h1>
        <p className="text-muted-foreground font-poppins">Análise de engajamento dos pacientes</p>
      </div>

      {/* Engagement Chart - Full Width */}
      <EngagementChart />
    </div>
  );
};

export default Reports;
