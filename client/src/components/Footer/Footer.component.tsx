import { Container } from '../UI/Container/Container.component';
import { FooterContent } from './FooterContent/FooterContent.component';
import { Background } from './components/Background.component';
import { Copyright } from './components/Copyright.component';
import { SocialLinks } from './components/SocialLinks.component';
import { socialLinks } from './constants/socialLinks.data';

export const Footer = () => (
  <footer className="w-full relative py-16 md:py-24 bg-gradient-to-b from-[#242424] via-[#242424] to-[#242424] overflow-hidden">
    <Background />
    <Container className="relative z-10">
      <div className="flex flex-col gap-16">
        <FooterContent />

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Copyright />
            <SocialLinks links={socialLinks} />
          </div>
        </div>
      </div>
    </Container>
  </footer>
);
