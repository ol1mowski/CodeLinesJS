import { Header } from './components/Header/Header.component'
import { HeroSection } from './components/Hero/HeroSection.component'
import { FeaturesSection } from './components/Features/FeaturesSection.component'
import { ChallengesSection } from './components/Challenges/ChallengesSection.component'
import { ProgressSection } from './components/Progress/ProgressSection.component'
function App() {
  return (
    <div className="bg-gray-900">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ChallengesSection />
      <ProgressSection />
    </div>
  )
}

export default App
