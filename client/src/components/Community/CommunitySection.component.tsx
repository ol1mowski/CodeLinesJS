import { Container } from "../UI/Container/Container.component";
import { FaSmileWink } from "react-icons/fa";

export const CommunitySection = () => (
  <section
    id="spolecznosc"
    className="min-h-screen w-full bg-gradient-to-b from-dark via-dark-medium to-dark py-16 md:py-24 relative overflow-hidden"
  >
    <Container className="relative z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-js text-4xl font-bold">Wkrótce</h1>
        <FaSmileWink className="text-js text-4xl" />
      </div>
      {/* <div className="flex flex-col items-center gap-12 md:gap-20">
        <Header />
        <Content />
      </div> */}
    </Container>
  </section>
);
