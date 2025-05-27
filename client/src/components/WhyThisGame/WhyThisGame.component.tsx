import { Container } from '../UI/Container/Container.component';
import { WhyThisGameContent } from './components/WhyThisGameContent/WhyThisGameContent.component';

export const WhyThisGameSection = () => (
  <section
    id="dlaczego-warto"
    className="min-h-screen w-full bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] py-16 md:py-24 relative overflow-hidden"
    aria-labelledby="dlaczego-warto-title"
  >

    <Container className="relative z-10">
      <WhyThisGameContent />
    </Container>
  </section>
); 