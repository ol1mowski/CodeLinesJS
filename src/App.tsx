import { Header } from './components/Header/Header.component'
import { HeroSection } from './components/Hero/HeroSection.component'
import { FeaturesSection } from './components/Features/FeaturesSection.component'
function App() {
  return (
    <div className="bg-gray-900">
      <Header />
      <HeroSection />
      <FeaturesSection />
    </div>
  )
}

export default App
