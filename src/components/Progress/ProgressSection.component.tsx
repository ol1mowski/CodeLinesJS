import { Container } from "../UI/Container/Container.component";
import { Background } from "./components/Background.component";
import { Header } from "./components/Header.component";
import { Content } from "./components/Content.component";

export const ProgressSection = () => (
  <section 
    id="postepy" 
    className="min-h-screen w-full bg-gradient-to-b from-dark via-dark-medium to-dark py-16 md:py-24 relative overflow-hidden"
  >
    <Background />
    <Container className="relative z-10">
      <div className="flex flex-col items-center gap-12 md:gap-20">
        <Header />
        <Content />
      </div>
    </Container>
  </section>
); 