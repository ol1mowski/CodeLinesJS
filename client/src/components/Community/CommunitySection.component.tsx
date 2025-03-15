import { Container } from "../UI/Container/Container.component";
import { Content } from "./components/Content.component";
import { Header } from "../Header/Header.component";

export const CommunitySection = () => (
  <section
    id="spolecznosc"
    className="min-h-screen w-full bg-gradient-to-b from-dark via-dark-medium to-dark py-16 md:py-24 relative overflow-hidden"
  >
    <Container className="relative z-10">
      <div className="flex flex-col items-center gap-12 md:gap-20">
        <Header />
        <Content />
      </div> 
    </Container>
  </section>
);
