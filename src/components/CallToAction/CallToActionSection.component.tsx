import { Container } from "../UI/Container/Container.component";
import { CallToActionAnimation } from "./CallToActionAnimation/CallToActionAnimation.component";
import { CallToActionContent } from "./CallToActionContent/CallToActionContent.component";


export const CallToActionSection = () => (
  <section className="h-screen w-full relative bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] overflow-hidden flex items-center">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#f7df1e] rounded-full blur-[120px]" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#f7df1e] rounded-full blur-[120px]" />
    </div>
    <Container className="relative z-10 h-full py-8">
      <div className="flex flex-col xl:flex-row items-center justify-center h-full gap-12 md:gap-16">
        <CallToActionContent />
        <CallToActionAnimation />
      </div>
    </Container>
  </section>
); 