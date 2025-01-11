type QuizCodeProps = {
  code: string;
};

export const QuizCode = ({ code }: QuizCodeProps) => (
  <pre className="p-6 bg-dark/50 font-mono text-sm overflow-x-auto">
    <code className="text-gray-300">
      {code}
    </code>
  </pre>
); 