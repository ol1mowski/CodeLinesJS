import { Container } from '../UI/Container/Container.component';
import { BackgroundGlow } from './components/BackgroundGlow.component';
import { BackgroundPattern } from './components/BackgroundPattern.component';
import { FeaturesContent } from './components/FeaturesContent.component';
import { FeaturesHeader } from './components/FeaturesHeader.component';

export const FeaturesSection = () => (
  <section
    id="gra"
    className="min-h-screen w-full bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] py-16 md:py-24 relative overflow-hidden"
  >
    <div className="absolute inset-0">
      <BackgroundGlow />
      <BackgroundPattern />
    </div>

    <Container className="relative z-10">
      <div className="flex flex-col items-center gap-12 md:gap-20">
        <FeaturesHeader />
        <FeaturesContent />
      </div>
    </Container>
  </section>
);
