import { Container } from "../UI/Container/Container.component";
import { SectionTitle } from "../UI/SectionTitle/SectionTitle.component";
import { RoadmapAnimation } from "./RoadmapAnimation/RoadmapAnimation.component";
import { RoadmapList } from "./RoadmapList/RoadmapList.component";


export const RoadmapSection = () => (
  <section className="min-h-screen w-full relative py-16 md:py-24 bg-gradient-to-b from-purple-900 via-fuchsia-900 to-blue-900 ">
    <Container className="relative z-10">
      <div className="flex flex-col items-center gap-8 md:gap-16">
        <SectionTitle
          title="Ścieżka Rozwoju"
          subtitle="Zaplanuj swoją drogę do mistrzostwa w JavaScript"
          className="text-center px-4"
        />
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 md:gap-16 w-full">
          <RoadmapList />
          <RoadmapAnimation />
        </div>
      </div>
    </Container>
  </section>
); 