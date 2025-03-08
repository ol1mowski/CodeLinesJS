import { Container } from "../UI/Container/Container.component";
import { HeroAnimation } from "./HeroAnimation/HeroAnimation.component";
import { HeroContent } from "./HeroContent/HeroContent.component";

export const HeroSection = () => {

  return (
    <section className="relative min-h-screen pt-16 w-full bg-gradient-to-b from-dark via-dark/90 to-dark overflow-hidden flex items-center">
      <Container className="relative w-full z-10 h-full py-8 pt-24 md:pt-32">
        <div className="flex flex-col xl:flex-row items-center justify-center h-full gap-8 md:gap-12 xl:gap-16">
          <HeroContent />
          <HeroAnimation />
        </div>
      </Container>
    </section>
  );
};
