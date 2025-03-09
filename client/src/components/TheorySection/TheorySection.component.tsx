import { Container } from "../UI/Container/Container.component";
import { SectionBackground } from "../UI/SectionBackground/SectionBackground.component";
import { TheoryContent } from "./components/TheoryContent/TheoryContent.component";
import { SectionHeader } from "../UI/SectionHeader/SectionHeader.component";

export const TheorySection = () => (
  <section
    id="theory"
    className="min-h-screen w-full bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] py-12 md:py-16 relative overflow-hidden"
    aria-labelledby="theory-title"
  >
    <SectionBackground />

    <Container className="relative z-10">
      <div className="flex flex-col items-center gap-8 md:gap-12">
        <SectionHeader
          badge="Krok 1: Teoria"
          title="Zbuduj Solidne Fundamenty"
          subtitle="Rozpocznij swoją przygodę z JavaScript od zrozumienia kluczowych koncepcji"
          id="theory-title"
        />
        <TheoryContent />
      </div>
    </Container>
  </section>
); 