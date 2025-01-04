import { Container } from "../UI/Container/Container.component";
import { SectionTitle } from "../UI/SectionTitle/SectionTitle.component";
import { CommunityAnimation } from "./CommunityAnimation/CommunityAnimation.component";
import { CommunityStats } from "./CommunityStats/CommunityStats.component";

export const CommunitySection = () => (
  <section id="społeczność" className="min-h-screen w-full relative py-16 md:py-24 bg-gradient-to-b from-blue-900 via-indigo-900 to-violet-900">
    <Container className="relative z-10">
      <div className="flex flex-col items-center gap-8 md:gap-16">
        <SectionTitle
          title="Społeczność"
          subtitle="Dołącz do tysięcy programistów uczących się razem"
          className="text-center px-4"
        />
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 md:gap-16 w-full">
          <CommunityStats />
          <CommunityAnimation />
        </div>
      </div>
    </Container>
  </section>
);
