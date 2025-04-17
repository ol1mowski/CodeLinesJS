import { MobileWrapper } from '../../UI/MobileWrapper/MobileWrapper.component';
import { CodeEditor } from './CodeEditor/CodeEditor.component';
import { useMobileDetect } from '../../../hooks/useMobileDetect';

export const HeroAnimation = () => {
  const isMobile = useMobileDetect();

  return (
    <MobileWrapper
      className="w-full xl:w-1/2 relative px-4 md:px-0 h-[45vh] flex items-center"
      motionProps={{
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: isMobile ? 0.3 : 0.8 },
      }}
    >
      <div className="rounded-xl border border-[#f7df1e]/20 bg-[#1E1E1E] overflow-hidden shadow-2xl w-full h-full flex flex-col">
        <div className="bg-[#2D2D2D] px-4 py-3 flex items-center gap-2 border-b border-black/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-gray-400 text-sm ml-2">script.js</span>
        </div>

        <div className="flex-1 overflow-hidden">
          <CodeEditor />
        </div>
      </div>
    </MobileWrapper>
  );
};
