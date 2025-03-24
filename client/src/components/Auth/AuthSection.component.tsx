import { type ReactNode } from 'react';
import { Container } from "../UI/Container/Container.component";
import { AuthBackground } from "./AuthBackground/AuthBackground.component";
import { AuthLeftSection } from './components/AuthLeftSection/AuthLeftSection.component';
import { AuthFormSection } from './components/AuthFormSection/AuthFormSection.component';
import { Helmet } from 'react-helmet-async';

type AuthSectionProps = {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
};

export const AuthSection = ({ children, title, subtitle }: AuthSectionProps = {}) => (
  <main className="min-h-screen w-full relative bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] flex items-center justify-center py-16 overflow-hidden">
    <Helmet>
      <title> Logowanie | CodeLinesJS</title>
      <meta name="description" content="Logowanie do platformy CodeLinesJS - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku." />
    </Helmet>
    <Container className="relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-20 w-full max-w-7xl mx-auto">
        <AuthLeftSection />
        <AuthFormSection children={children} title={title} subtitle={subtitle} />
      </div>
    </Container>
    <AuthBackground />
  </main>
); 