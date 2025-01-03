import { Container } from "../UI/Container/Container.component";
import { SectionTitle } from "../UI/SectionTitle/SectionTitle.component";
import { CodeAnimation } from "./CodeAnimation/CodeAnimation.component";
import { FeaturesList } from "./FeaturesList/FeaturesList.component";

export const FeaturesSection = () => (
  <section className="min-h-screen w-full bg-gradient-to-b from-violet-900 via-indigo-900 to-gray-900 py-16 md:py-24 relative">
    <Container className="relative z-10">
      <div className="flex flex-col items-center gap-8 md:gap-16">
        <SectionTitle
          title="Odkryj Moc JavaScript"
          subtitle="Poznaj kluczowe funkcje naszej platformy"
          className="text-center px-4"
        />
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 md:gap-16 w-full">
          <FeaturesList />
          <CodeAnimation />
        </div>
      </div>
    </Container>
  </section>
);
