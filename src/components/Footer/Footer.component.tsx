import { Container } from "../UI/Container/Container.component";
import { FooterContent } from "./FooterContent/FooterContent.component";

export const Footer = () => (
  <footer className="w-full relative py-16 md:py-24 bg-gradient-to-b from-blue-900 to-gray-900 overflow-hidden">
    <Container className="relative z-10">
      <div className="flex flex-col gap-16">
        <FooterContent />
      </div>
    </Container>
  </footer>
);
