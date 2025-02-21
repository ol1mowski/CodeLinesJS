import { memo } from 'react';

type QuizCodeProps = {
  code: string;
};

const getLineColor = (line: string): string => {
  if (line.startsWith("//")) return "text-[#6A9955]";
  if (line.startsWith("function")) return "text-[#569CD6]";
  if (line.startsWith("const")) return "text-[#4EC9B0]";
  if (line.includes("return")) return "text-[#C586C0]";
  if (line.includes("=>")) return "text-[#DCDCAA]";
  if (line.includes("`")) return "text-[#CE9178]";
  if (line.includes("console.log")) return "text-[#DCDCAA]";
  if (line.includes("===") || line.includes("==")) return "text-[#D4D4D4]";
  return "text-[#9CDCFE]";
};

export const QuizCode = memo(({ code }: QuizCodeProps) => (
  <pre className="p-6 bg-[#1E1E1E] font-mono text-sm overflow-x-auto">
    <code>
      {code.split('\n').map((line, index) => (
        <div key={index} className={getLineColor(line)}>
          {line}
        </div>
      ))}
    </code>
  </pre>
));

QuizCode.displayName = 'QuizCode'; 