import { motion } from "framer-motion";
import { useState } from "react";

const question = {
  title: "Co zwróci poniższy kod?",
  code: `const x = 5;
const y = "5";

console.log(x == y);
console.log(x === y);`,
  options: [
    { id: 1, text: "true, true" },
    { id: 2, text: "true, false" },
    { id: 3, text: "false, false" },
    { id: 4, text: "false, true" }
  ],
  correctAnswer: 2
};

export const CodeQuiz = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (answerId: number) => {
    setSelectedAnswer(answerId);
    setShowResult(true);
  };

  const getAnswerColor = (answerId: number) => {
    if (!showResult) return "hover:bg-[#f7df1e]/10";
    if (answerId === question.correctAnswer) return "bg-green-500/20 border-green-500/50";
    if (answerId === selectedAnswer) return "bg-red-500/20 border-red-500/50";
    return "opacity-50";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-[#f7df1e]/20 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#f7df1e]/10">
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[#f7df1e] text-xl"
            >
              🎯
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold text-[#f7df1e]">
            Rozwiąż Quiz
          </h2>
        </div>
        <span className="text-sm text-gray-400">
          Sprawdź swoją wiedzę
        </span>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#f7df1e]">
          {question.title}
        </h3>
        <pre className="bg-[#1a1a1a] p-4 rounded-lg overflow-x-auto font-mono text-sm text-gray-300">
          <code>{question.code}</code>
        </pre>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => !showResult && handleAnswerClick(option.id)}
            whileHover={!showResult ? { scale: 1.02 } : {}}
            whileTap={!showResult ? { scale: 0.98 } : {}}
            className={`p-4 rounded-lg border border-[#f7df1e]/20 text-left transition-all
              ${getAnswerColor(option.id)}`}
            disabled={showResult}
          >
            <span className="text-gray-300">{option.text}</span>
          </motion.button>
        ))}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            selectedAnswer === question.correctAnswer
              ? "bg-green-500/20 border border-green-500/50"
              : "bg-red-500/20 border border-red-500/50"
          }`}
        >
          <p className="text-gray-300">
            {selectedAnswer === question.correctAnswer
              ? "Brawo! To prawidłowa odpowiedź! Operator == porównuje wartości po konwersji typów, podczas gdy === porównuje zarówno wartości jak i typy."
              : "Niestety, to nie jest prawidłowa odpowiedź. Operator == porównuje wartości po konwersji typów, podczas gdy === porównuje zarówno wartości jak i typy."}
          </p>
        </motion.div>
      )}
    </div>
  );
}; 