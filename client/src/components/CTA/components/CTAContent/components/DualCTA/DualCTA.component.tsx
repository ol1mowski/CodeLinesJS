import { CTACard } from '../../CTACard/CTACard.component';

export const DualCTA = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <CTACard
        variant="challenge"
        icon="🔥"
        title="Wyzwanie dla Pro Graczy"
        subtitle="Myślisz, że jesteś gotowy?"
        description="Tylko 3% graczy ukończyło wszystkie poziomy. Czy dołączysz do elit?"
        primaryButton={{
          text: "🏆 PRZYJMIJ WYZWANIE",
          to: "/dashboard"
        }}
      />

      <CTACard
        variant="beginner"
        icon="🚀"
        title="Szybki Start dla Początkujących"
        subtitle="Pierwszy raz z kodem? Idealnie!"
        description="Naucz się podstaw w 30 minut i zacznij budować swoje pierwsze aplikacje!"
        primaryButton={{
          text: "🌟 ZACZNIJ OD PODSTAW",
          to: "/dashboard"
        }}
      />
    </div>
  );
}; 