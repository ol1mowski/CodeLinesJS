import { memo } from 'react';

type CodeBlockProps = {
  code: string;
};

export const CodeBlock = memo(({ code }: CodeBlockProps) => (
  <pre className="bg-dark/50 p-4 rounded-lg mb-6 overflow-x-auto border border-js/10">
    <code className="text-js/90 font-mono">{code}</code>
  </pre>
));

CodeBlock.displayName = 'CodeBlock';
