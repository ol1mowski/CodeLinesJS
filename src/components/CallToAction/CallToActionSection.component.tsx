import { Container } from "../UI/Container/Container.component";
import { CallToActionAnimation } from "./CallToActionAnimation/CallToActionAnimation.component";
import { CallToActionContent } from "./CallToActionContent/CallToActionContent.component";
import { useBackgroundEffect } from "./hooks/useBackgroundEffect.hook";

export const CallToActionSection = () => {
  const mousePosition = useBackgroundEffect();

  return (
    <section className="relative min-h-screen pt-16 w-full bg-gradient-to-b from-dark via-dark/90 to-dark overflow-hidden flex items-center">
      <BackgroundGlow position={mousePosition} />
      <Container className="relative w-full z-10 h-full py-8 pt-24 md:pt-8">
        <div className="flex flex-col xl:flex-row items-center justify-center h-full gap-8 md:gap-12 xl:gap-16">
          <CallToActionContent />
          <CallToActionAnimation />
        </div>
      </Container>
    </section>
  );
};

type BackgroundGlowProps = {
  position: { x: number; y: number };
};

const BackgroundGlow = ({ position }: BackgroundGlowProps) => (
  <div className="absolute inset-0 opacity-10">
    <div 
      className="absolute w-72 h-72 bg-js rounded-full blur-[120px] transition-all duration-300"
      style={{ 
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
    />
  </div>
); 