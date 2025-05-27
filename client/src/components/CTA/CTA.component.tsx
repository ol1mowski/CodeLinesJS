import { Container } from '../UI/Container/Container.component';
import { CTAContent } from './components/CTAContent/CTAContent.component';

export const CTASection = () => (
  <section
    id="cta"
    className="min-h-screen w-full bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] py-16 md:py-24 relative overflow-hidden"
    aria-labelledby="cta-title"
  >

    <Container className="relative z-10">
      <CTAContent />
    </Container>
  </section>
); 