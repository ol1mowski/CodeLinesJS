import { Container } from '../UI/Container/Container.component';
import { SectionBackground } from '../UI/SectionBackground/SectionBackground.component';
import { AboutGameContent } from './components/AboutGameContent/AboutGameContent.component';

export const AboutGameSection = () => (
  <section
    id="about-game"
    className="min-h-screen w-full bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] py-12 md:py-16 relative overflow-hidden"
    aria-labelledby="about-game-title"
  >
    <SectionBackground glowPosition="right" />

    <Container className="relative z-10">
      <AboutGameContent />
    </Container>
  </section>
); 