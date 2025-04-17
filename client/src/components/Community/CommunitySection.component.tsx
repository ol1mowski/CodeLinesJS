import { Container } from '../UI/Container/Container.component';
import { Content } from './components/Content.component';
import { Header } from '../Header/Header.component';
import { BackgroundPattern } from '../Features/components/BackgroundPattern.component';

export const CommunitySection = () => (
  <section
    id="spolecznosc"
    className="min-h-screen w-full bg-gradient-to-b from-dark via-dark-medium to-dark py-16 md:py-24 relative overflow-hidden"
  >
    <div className="absolute inset-0">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[#1a1a1a] opacity-90" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#f7df1e] rounded-full blur-[100px] opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#f7df1e] rounded-full blur-[100px] opacity-10" />
      </div>
      <BackgroundPattern />
    </div>
    <Container className="relative z-10">
      <div className="flex flex-col items-center gap-12 md:gap-20">
        <Header />
        <Content />
      </div>
    </Container>
  </section>
);
