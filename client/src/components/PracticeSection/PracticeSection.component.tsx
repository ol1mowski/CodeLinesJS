import React from 'react';
import { Container } from "../UI/Container/Container.component";
import { SectionBackground } from "../UI/SectionBackground/SectionBackground.component";
import { PracticeContent } from "./components/PracticeContent/PracticeContent.component";
import { SectionHeader } from "../UI/SectionHeader/SectionHeader.component";

export const PracticeSection: React.FC = () => (
  <section 
    id="practice" 
    className="min-h-screen w-full bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] py-12 md:py-16 relative overflow-hidden"
    aria-labelledby="practice-title"
  >
    <SectionBackground glowPosition="left" />
    
    <Container className="relative z-10">
      <div className="flex flex-col items-center gap-8 md:gap-12">
        <SectionHeader 
          badge="Krok 2: Praktyka"
          title="Zastosuj Wiedzę w Praktyce"
          subtitle="Sprawdź swoje umiejętności w interaktywnych grach i wyzwaniach"
          id="practice-title"
        />
        <PracticeContent />
      </div>
    </Container>
  </section>
); 