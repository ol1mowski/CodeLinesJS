import React from 'react';
import { Header } from '../components/Header/Header.component';
import { FeaturesSection } from '../components/Features/FeaturesSection.component';
import { ChallengesSection } from '../components/Challenges/ChallengesSection.component';
import { ProgressSection } from '../components/Progress/ProgressSection.component';
import { CommunitySection } from '../components/Community/CommunitySection.component';
import { CollaborateSection } from '../components/Collaborate/CollaborateSection.component';
import { TheorySection } from '../components/TheorySection/TheorySection.component';
import { PracticeSection } from '../components/PracticeSection/PracticeSection.component';
import { HeroSection } from '../components/Hero/Hero.component';
import { Footer } from '../components/Footer/Footer.component';

/**
 * Strona główna aplikacji
 * Zawiera wszystkie sekcje landing page
 */
const Home: React.FC = () => {
  return (
    <div className="bg-gray-900">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TheorySection />
      <PracticeSection />
      <ChallengesSection />
      <ProgressSection />
      <CommunitySection />
      <CollaborateSection />
      <Footer />
    </div>
  );
};

export default Home; 