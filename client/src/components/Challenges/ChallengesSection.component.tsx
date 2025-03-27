import { memo } from 'react';
import { Container } from "../UI/Container/Container.component";
import { Background } from "./components/Background.component";
import { Header } from "./components/Header.component";
import { Content } from "./components/Content.component";

export const ChallengesSection = memo(() => (
  <section 
    id="wyzwania" 
    className="min-h-screen w-full bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] py-16 md:py-24 relative overflow-hidden"
  >
    <Background />
    <Container className="relative z-10">
      <div className="flex flex-col items-center gap-12 md:gap-20">
        <Header />
        <Content />
      </div>
    </Container>
  </section>
));

ChallengesSection.displayName = 'ChallengesSection'; 