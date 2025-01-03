import { Header } from './components/Header/Header.component'
import { HeroSection } from './components/Hero/HeroSection.component'
import { FeaturesSection } from './components/Features/FeaturesSection.component'
import { ChallengesSection } from './components/Challenges/ChallengesSection.component'
import { ProgressSection } from './components/Progress/ProgressSection.component'
import { RoadmapSection } from './components/Roadmap/RoadmapSection.component'
import { CommunitySection } from './components/Community/CommunitySection.component'

function App() {
  return (
    <div className="bg-gray-900">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ChallengesSection />
      <ProgressSection />
      <RoadmapSection />
      <CommunitySection />
    </div>
  )
}

export default App
