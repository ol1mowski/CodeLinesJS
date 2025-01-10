import { Header } from '../components/Header/Header.component';
import { FeaturesSection } from '../components/Features/FeaturesSection.component';
import { ChallengesSection } from '../components/Challenges/ChallengesSection.component';
import { ProgressSection } from '../components/Progress/ProgressSection.component';
import { CommunitySection } from '../components/Community/CommunitySection.component';
import { CallToActionSection } from '../components/CallToAction/CallToActionSection.component';
import { Footer } from '../components/Footer/Footer.component';

const Home = () => {
  return (
    <div className="bg-gray-900">
      <Header />
      <CallToActionSection />
      <FeaturesSection />
      <ChallengesSection />
      <ProgressSection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default Home; 