import { Container } from "../UI/Container/Container.component";
import { AuthContent } from "./AuthContent/AuthContent.component";
import { AuthBackground } from "./AuthBackground/AuthBackground.component";
import { ReactNode } from "react";
import { PhonePreview } from "../UI/PhonePreview/PhonePreview.component";
import { motion } from "framer-motion";

type AuthSectionProps = {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
};

export const AuthSection = ({ children, title, subtitle }: AuthSectionProps = {}) => (
  <main className="min-h-screen w-full relative bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] flex items-center justify-center py-16 overflow-hidden">
    <Container className="relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-20 w-full max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-3/5 flex flex-col md:flex-row items-center gap-6 md:gap-12 pr-0 md:pr-8"
        >
          <div className="hidden md:block">
            <PhonePreview 
              position="left"
              title="CodeLinesJS App"
              className="transform scale-90"
            />
          </div>
          
            <div className="text-center md:text-left max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Odkryj <span className="text-[#f7df1e]">JavaScript</span> w nowy sposób
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Ucz się, programuj i baw się jednocześnie. Nasza platforma łączy teorię z praktyką, 
              oferując interaktywne lekcje, wyzwania i gry.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-center md:justify-start bg-[#f7df1e]/10 rounded-lg p-3">
                <span className="text-[#f7df1e] font-medium">✓ Interaktywne lekcje</span>
              </div>
              <div className="flex items-center justify-center md:justify-start bg-[#f7df1e]/10 rounded-lg p-3">
                <span className="text-[#f7df1e] font-medium">✓ Wyzwania i gry</span>
              </div>
              <div className="flex items-center justify-center md:justify-start bg-[#f7df1e]/10 rounded-lg p-3">
                <span className="text-[#f7df1e] font-medium">✓ Śledzenie postępów</span>
              </div>
              <div className="flex items-center justify-center md:justify-start bg-[#f7df1e]/10 rounded-lg p-3">
                <span className="text-[#f7df1e] font-medium">✓ Społeczność</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="w-full md:w-2/5 flex justify-center md:justify-end relative mt-12 md:mt-0">
          <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#f7df1e]/10 rounded-full blur-3xl"></div>
          {children ? (
            <div className="w-full max-w-md bg-dark/30 backdrop-blur-xl rounded-2xl p-8 border border-js/20">
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
      </div>
    </Container>
    <AuthBackground />
  </main>
); 