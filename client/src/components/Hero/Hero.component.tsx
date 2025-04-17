import { Container } from '../UI/Container/Container.component';
import { HeroAnimation } from './HeroAnimation/HeroAnimation.component';
import { HeroContent } from './HeroContent/HeroContent.component';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-16 w-full bg-gradient-to-b from-dark via-dark/90 to-dark overflow-hidden flex items-center">
      <div className="absolute top-0 left-0 w-full h-full bg-[#1a1a1a] opacity-90" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
      <Container className="relative w-full z-10 h-full py-8 pt-24 md:pt-32">
        <div className="flex flex-col xl:flex-row items-center justify-center h-full gap-8 md:gap-12 xl:gap-16">
          <HeroContent />
          <HeroAnimation />
        </div>
      </Container>
    </section>
  );
};
