const mealPlan = {
  days: [
    {
      day: "Segunda-feira",
      meals: [
        { time: "07:00", name: "Café da manhã", foods: ["2 fatias pão integral", "2 ovos mexidos", "1 copo suco laranja"] },
        { time: "10:00", name: "Lanche", foods: ["1 maçã", "5 castanhas"] },
        { time: "12:30", name: "Almoço", foods: ["150g arroz integral", "100g feijão", "150g frango grelhado", "Salada à vontade"] },
        { time: "16:00", name: "Lanche", foods: ["Iogurte natural", "30g granola"] },
        { time: "19:30", name: "Jantar", foods: ["150g peixe assado", "150g batata doce", "Legumes no vapor"] },
      ],
    },
    {
      day: "Terça-feira",
      meals: [
        { time: "07:00", name: "Café da manhã", foods: ["Overnight oats", "Frutas vermelhas"] },
        { time: "10:00", name: "Lanche", foods: ["1 banana", "1 colher pasta amendoim"] },
        { time: "12:30", name: "Almoço", foods: ["150g macarrão integral", "Molho de tomate caseiro", "100g carne moída magra"] },
        { time: "16:00", name: "Lanche", foods: ["Vitamina de frutas"] },
        { time: "19:30", name: "Jantar", foods: ["Omelete de legumes", "Salada verde"] },
      ],
    },
    {
      day: "Quarta-feira",
      meals: [
        { time: "07:00", name: "Café da manhã", foods: ["Tapioca com queijo", "Café com leite"] },
        { time: "10:00", name: "Lanche", foods: ["Mix de oleaginosas"] },
        { time: "12:30", name: "Almoço", foods: ["150g arroz integral", "100g lentilha", "150g carne grelhada", "Legumes refogados"] },
        { time: "16:00", name: "Lanche", foods: ["Iogurte grego", "Frutas picadas"] },
        { time: "19:30", name: "Jantar", foods: ["Sopa de legumes", "Torrada integral"] },
      ],
    },
    {
      day: "Quinta-feira",
      meals: [
        { time: "07:00", name: "Café da manhã", foods: ["Panqueca de aveia", "Mel", "Frutas"] },
        { time: "10:00", name: "Lanche", foods: ["1 pera", "Queijo cottage"] },
        { time: "12:30", name: "Almoço", foods: ["150g quinoa", "150g salmão", "Salada variada", "Azeite"] },
        { time: "16:00", name: "Lanche", foods: ["Smoothie verde"] },
        { time: "19:30", name: "Jantar", foods: ["Frango desfiado", "Purê de abóbora", "Brócolis"] },
      ],
    },
    {
      day: "Sexta-feira",
      meals: [
        { time: "07:00", name: "Café da manhã", foods: ["Pão integral", "Abacate amassado", "Ovo poché"] },
        { time: "10:00", name: "Lanche", foods: ["Barra de cereal integral"] },
        { time: "12:30", name: "Almoço", foods: ["150g arroz", "100g feijão branco", "150g filé de tilápia", "Salada"] },
        { time: "16:00", name: "Lanche", foods: ["Iogurte", "Granola"] },
        { time: "19:30", name: "Jantar", foods: ["Pizza caseira integral", "Salada"] },
      ],
    },
  ],
  notes: "Beber pelo menos 2L de água por dia. Evitar alimentos processados. Substituições permitidas conforme lista anexa. Em caso de dúvidas, entre em contato com seu nutricionista.",
  substitutions: [
    "Arroz integral → Quinoa ou Batata doce",
    "Frango → Peixe ou Peru",
    "Leite integral → Leite desnatado ou Bebida vegetal",
    "Pão integral → Tapioca ou Wrap integral",
  ],
};

const PatientPlan = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-poppins">Plano Alimentar</h1>
        <p className="text-muted-foreground font-poppins">Seu plano personalizado</p>
      </div>

      {/* Meal Plan */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <div className="space-y-6">
          {mealPlan.days.map((day, index) => (
            <div key={index} className="border-b border-border pb-6 last:border-0 last:pb-0">
              <h4 className="font-semibold text-foreground font-poppins mb-4 text-lg">{day.day}</h4>
              <div className="space-y-3">
                {day.meals.map((meal, mealIndex) => (
                  <div key={mealIndex} className="flex gap-4 p-4 bg-background rounded-lg">
                    <div className="w-16 h-10 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-primary-foreground font-poppins">{meal.time}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground font-poppins">{meal.name}</p>
                      <ul className="text-sm text-muted-foreground font-poppins mt-1 space-y-0.5">
                        {meal.foods.map((food, foodIndex) => (
                          <li key={foodIndex}>• {food}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Substitutions */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <h3 className="font-semibold text-foreground font-poppins mb-4">Substituições permitidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mealPlan.substitutions.map((sub, index) => (
            <div key={index} className="p-3 bg-background rounded-lg text-sm text-muted-foreground font-poppins">
              {sub}
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
        <p className="text-sm font-medium text-foreground font-poppins mb-1">Observações do nutricionista</p>
        <p className="text-sm text-muted-foreground font-poppins">{mealPlan.notes}</p>
      </div>
    </div>
  );
};

export default PatientPlan;
