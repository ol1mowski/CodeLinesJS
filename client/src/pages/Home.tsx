import { Header } from '../components/Header/Header.component';

import { TheorySection } from '../components/TheorySection/TheorySection.component';
import { PracticeSection } from '../components/PracticeSection/PracticeSection.component';
import { HeroSection } from '../components/Hero/Hero.component';
import { Footer } from '../components/Footer/Footer.component';
import { TestimonialsSection } from '../components/Testimonials/TestimonialsSection.component';
import { AboutGameSection } from '../components/AboutGame/AboutGame.component';
import { LatestNewsSection } from '../components/LatestNews/LatestNews.component';
import { WhyThisGameSection } from '../components/WhyThisGame/WhyThisGame.component';
import { CTASection } from '../components/CTA/CTA.component';

const Home = () => {
  return (
    <div className="bg-gray-900">
      <Header />
      <HeroSection />
      <LatestNewsSection />
      <AboutGameSection />
      <TheorySection />
      <PracticeSection />
      <WhyThisGameSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
