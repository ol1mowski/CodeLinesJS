import { Container } from "../UI/Container/Container.component";
import { LearningPathContent } from "./components/LearningPathContent.component";
import { LearningPathHeader } from "./components/LearningPathHeader.component";
import { BackgroundGlow } from "../Collaborate/components/BackgroundGlow.component";
import { BackgroundPattern } from "../Collaborate/components/BackgroundPattern.component";
import { ScrollDownIndicator } from "./components/ScrollDownIndicator.component";

export const LearningPathSection = () => (
  <section 
    id="learning-path" 
    className="min-h-screen w-full bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] py-16 md:py-24 relative overflow-hidden"
  >
    <div className="absolute inset-0">
      <BackgroundGlow />
      <BackgroundPattern />
    </div>
    
    <Container className="relative z-10">
      <div className="flex flex-col items-center gap-12 md:gap-20">
        <LearningPathHeader />
        <LearningPathContent />
      </div>
    </Container>
    
    <ScrollDownIndicator targetId="collaborate" />
  </section>
); 