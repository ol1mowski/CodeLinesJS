import { Container } from "../UI/Container/Container.component";
import { SectionTitle } from "../UI/SectionTitle/SectionTitle.component";
import { ChallengesList } from "./ChallengesList/ChallengesList.component";
import { ChallengesAnimation } from "./ChallengesAnimation/ChallengesAnimation.component";

export const ChallengesSection = () => (
  <section className="min-h-screen w-full relative py-16 md:py-24 bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900">
    <Container className="relative z-10">
      <div className="flex flex-col items-center gap-8 md:gap-16">
        <SectionTitle
          title="Wyzwania JavaScript"
          subtitle="Od podstaw do zaawansowanych konceptów"
          className="text-center px-4"
        />
        <div className="flex flex-col-reverse xl:flex-row items-center justify-between gap-8 md:gap-16 w-full">
          <ChallengesList />
          <ChallengesAnimation />
        </div>
      </div>
    </Container>
  </section>
); 