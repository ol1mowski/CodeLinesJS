import { Container } from "../UI/Container/Container.component";
import { AuthContent } from "./AuthContent/AuthContent.component";
import { AuthBackground } from "./AuthBackground/AuthBackground.component";
import { ReactNode } from "react";

type AuthSectionProps = {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
};

export const AuthSection = ({ children, title, subtitle }: AuthSectionProps = {}) => (
  <main className="min-h-screen w-full relative bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] flex items-center justify-center py-16 overflow-hidden">
    <Container className="relative z-10">
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
        {children ? (
          <div className="w-full bg-dark/50 backdrop-blur-lg rounded-2xl p-8 border border-js/20">
            <div className="flex flex-col justify-center items-center mb-8">
              <span className="block text-2xl bg-[#f7df1e] text-black px-2 py-1 rounded">JS</span>
              <h2 className="mt-2 text-xl font-bold text-js">
                CodeLinesJS
              </h2>
            </div>

            {title && (
              <h1 className="text-3xl font-bold text-center text-js mb-4">
                {title}
              </h1>
            )}

            {subtitle && (
              <p className="text-center text-gray-400 mb-8">
                {subtitle}
              </p>
            )}

            {children}
          </div>
        ) : (
          <AuthContent />
        )}
      </div>
    </Container>
    <AuthBackground />
  </main>
); 