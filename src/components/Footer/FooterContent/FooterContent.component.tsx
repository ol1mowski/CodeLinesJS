import { FooterIntro } from './components/FooterIntro.component';
import { FooterLinks } from './components/FooterLinks.component';
import { links } from './constants/links.data';

export const FooterContent = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
    <FooterIntro />
    <FooterLinks title="Zasoby" links={links.resources} delay={0.2} />
    <FooterLinks title="Social Media" links={links.social} delay={0.3} />
  </div>
); 