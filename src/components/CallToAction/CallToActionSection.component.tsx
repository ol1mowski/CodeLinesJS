import { Container } from "../UI/Container/Container.component";
import { CallToActionAnimation } from "./CallToActionAnimation/CallToActionAnimation.component";
import { CallToActionContent } from "./CallToActionContent/CallToActionContent.component";


export const CallToActionSection = () => (
  <section className="min-h-[80vh] w-full relative py-16 md:py-24 bg-gradient-to-b from-violet-900 via-indigo-900 to-blue-900 overflow-hidden">
    <Container className="relative z-10">
      <div className="flex flex-col xl:flex-row items-center justify-between gap-12 md:gap-16">
        <CallToActionContent />
        <CallToActionAnimation />
      </div>
    </Container>
  </section>
); 