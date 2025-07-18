import { memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy } from 'react-icons/fa';
import { sanitizeCode } from '../../../../../utils/security.util';

const SyntaxHighlighterComponent = SyntaxHighlighter as any;

type CodeBlockProps = {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  className?: string;
};

export const CodeBlock = memo(
  ({ code, language, showLineNumbers = true, className }: CodeBlockProps) => {
    const sanitizedCode = sanitizeCode(code);

    const handleCopy = () => {
      navigator.clipboard.writeText(sanitizedCode);
    };

    return (
      <div className={`relative group ${className}`}>
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 p-2 rounded-lg bg-dark/50 text-gray-400 
          opacity-0 group-hover:opacity-100 transition-opacity hover:text-js"
          title="Kopiuj kod"
        >
          <FaCopy className="w-4 h-4" />
        </button>

        <SyntaxHighlighterComponent
          language={language}
          style={atomDark}
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
            background: 'transparent',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'JetBrains Mono, monospace',
            },
          }}
        >
          {sanitizedCode}
        </SyntaxHighlighterComponent>
      </div>
    );
  }
);

CodeBlock.displayName = 'CodeBlock';
