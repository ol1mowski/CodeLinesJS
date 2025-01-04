import { Container } from "../UI/Container/Container.component";
import { SectionTitle } from "../UI/SectionTitle/SectionTitle.component";
import { ProgressAnimation } from "./ProgressAnimation/ProgressAnimation.component";
import { ProgressStats } from "./ProgressStats/ProgressStats.component";


export const ProgressSection = () => (
  <section className="min-h-screen w-full relative py-16 md:py-24 bg-gradient-to-b from-indigo-900 via-violet-900 to-purple-900">
    <Container className="relative z-10">
      <div className="flex flex-col items-center gap-8 md:gap-16">
        <SectionTitle
          title="Twoje Postępy"
          subtitle="Śledź swój rozwój w nauce JavaScript"
          className="text-center px-4"
        />
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 md:gap-16 w-full">
          <ProgressStats />
          <ProgressAnimation />
        </div>
      </div>
    </Container>
  </section>
); 