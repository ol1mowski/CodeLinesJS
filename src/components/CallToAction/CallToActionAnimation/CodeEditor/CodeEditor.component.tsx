import { useCodeAnimation } from './hooks/useCodeAnimation.hook';
import { AnimatedCodeLine } from './components/AnimatedCodeLine.component';
import { codeLines } from './data/codeExample';

export const CodeEditor = () => {
  const { visibleLines, currentLineIndex } = useCodeAnimation();

  return (
    <div className="p-6 font-mono text-sm md:text-base h-full overflow-y-auto custom-scrollbar">
      <pre className="flex flex-col">
        {visibleLines.map((codeLine, index) => (
          <AnimatedCodeLine
            key={index}
            lineNumber={index + 1}
            code={codeLine}
            showCursor={index === visibleLines.length - 1 && currentLineIndex < codeLines.length}
          />
        ))}
      </pre>
    </div>
  );
}; 