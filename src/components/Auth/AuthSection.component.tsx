import { Container } from "../UI/Container/Container.component";
import { AuthContent } from "./AuthContent/AuthContent.component";
import { AuthBackground } from "./AuthBackground/AuthBackground.component";

export const AuthSection = () => (
  <main className="min-h-screen w-full relative bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] flex items-center justify-center py-16 overflow-hidden">
    <Container className="relative z-10">
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <AuthContent />
      </div>
    </Container>
    <AuthBackground />
  </main>
); 