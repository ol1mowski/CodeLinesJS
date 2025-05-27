import { Header } from '../components/Header/Header.component';
import { ChallengesSection } from '../components/Challenges/ChallengesSection.component';
import { ProgressSection } from '../components/Progress/ProgressSection.component';
import { TheorySection } from '../components/TheorySection/TheorySection.component';
import { PracticeSection } from '../components/PracticeSection/PracticeSection.component';
import { HeroSection } from '../components/Hero/Hero.component';
import { Footer } from '../components/Footer/Footer.component';
import { CommunitySection } from '../components/Community/CommunitySection.component';
import { TestimonialsSection } from '../components/Testimonials/TestimonialsSection.component';

const Home = () => {
  return (
    <div className="bg-gray-900">
      <Header />
      <HeroSection />
      <TheorySection />
      <PracticeSection />
      <ChallengesSection />
      <CommunitySection />
      <ProgressSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Home;
