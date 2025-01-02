import { Container } from "../UI/Container/Container.component";
import { Animation3D } from "./Amimation/Animation3D.component";
import { HeroContent } from "./HeroContent/HeroContent.component";

import { BackgroundEffects } from "../UI/BackgroundEffect/BackgroundEffects.component";

export const HeroSection = () => {

  return (
    <main className="min-h-screen w-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center relative overflow-hidden">
      <Container className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <HeroContent
          title="Code Lines JS"
          description="Rozpocznij interaktywną przygodę z programowaniem. Rozwiązuj wyzwania kodowania i rozwijaj swoje umiejętności JavaScript w formie wciągającej gry."
          buttonText="Rozpocznij Naukę"
        />
        <Animation3D />
      </Container>
      
      <BackgroundEffects />
    </main>
  );
}; 