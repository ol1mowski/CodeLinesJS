import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

const codeLines = [
  {
    line: "// Witaj w CodeLinesJS! 🚀",
    indent: 0,
  },
  {
    line: "",
    indent: 0,
  },
  {
    line: "function calculateScore(challenges) {",
    indent: 0,
  },
  {
    line: "const points = challenges.reduce((total, challenge) => {",
    indent: 1,
  },
  {
    line: "return total + challenge.difficulty * 100;",
    indent: 2,
  },
  {
    line: "}, 0);",
    indent: 1,
  },
  {
    line: "",
    indent: 0,
  },
  {
    line: "const bonus = points > 1000 ? points * 0.1 : 0;",
    indent: 1,
  },
  {
    line: "return points + bonus;",
    indent: 1,
  },
  {
    line: "}",
    indent: 0,
  },
  {
    line: "",
    indent: 0,
  },
  {
    line: "// Oblicz wynik gracza",
    indent: 0,
  },
  {
    line: "const playerScore = calculateScore(completedChallenges);",
    indent: 0,
  },
  {
    line: "console.log(`Twój wynik: ${playerScore} punktów! 🎮`);",
    indent: 0,
  },
];

export const CodeEditor = () => {
  const controls = useAnimationControls();

  useEffect(() => {
    const animateCode = async () => {
      await controls.start("visible");
    };
    animateCode();
  }, [controls]);

  return (
    <div className="p-6 font-mono text-sm md:text-base h-full overflow-y-auto custom-scrollbar">
      <pre className="flex flex-col">
        {codeLines.map((code, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={controls}
            custom={index}
            variants={{
              visible: (i) => ({
                opacity: 1,
                x: 0,
                transition: {
                  delay: i * 0.1,
                },
              }),
            }}
            className="whitespace-pre"
          >
            <span className="text-gray-500 select-none w-8 inline-block">
              {index + 1}
            </span>
            <span className="text-gray-400 select-none">│ </span>
            <span
              style={{ paddingLeft: `${code.indent * 20}px` }}
              className={getLineColor(code.line)}
            >
              {code.line}
            </span>
          </motion.span>
        ))}
      </pre>
    </div>
  );
};

const getLineColor = (line: string) => {
  if (line.startsWith("//")) {
    return "text-[#6A9955]";
  }
  if (line.startsWith("function")) {
    return "text-[#569CD6]";
  }
  if (line.startsWith("const")) {
    return "text-[#4EC9B0]";
  }
  if (line.includes("return")) {
    return "text-[#C586C0]";
  }
  if (line.includes("=>")) {
    return "text-[#DCDCAA]";
  }
  if (line.includes("`")) {
    return "text-[#CE9178]";
  }
  if (line.includes("console.log")) {
    return "text-[#DCDCAA]";
  }
  return "text-[#9CDCFE]";
}; 