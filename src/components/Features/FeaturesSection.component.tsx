import { Container } from "../UI/Container/Container.component";
import { SectionTitle } from "../UI/SectionTitle/SectionTitle.component";
import { CodeAnimation } from "./CodeAnimation/CodeAnimation.component";
import { FeaturesList } from "./FeaturesList/FeaturesList.component";

export const FeaturesSection = () => (
  <section className="min-h-screen w-full bg-gradient-to-b from-violet-900 via-indigo-900 to-gray-900 py-24 relative overflow-hidden">
    <Container className="relative z-10">
      <div className="flex flex-col items-center gap-16">
        <SectionTitle
          title="Odkryj Moc JavaScript"
          subtitle="Poznaj kluczowe funkcje naszej platformy"
          className="text-center"
        />
        <div className="flex flex-col xl:flex-row items-center justify-between gap-16">
          <FeaturesList />
          <CodeAnimation />
        </div>
      </div>
    </Container>
  </section>
); 