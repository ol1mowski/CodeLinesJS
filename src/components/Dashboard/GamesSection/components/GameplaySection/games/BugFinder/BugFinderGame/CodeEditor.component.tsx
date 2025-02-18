import { memo, useRef, useCallback, useEffect } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);

type CodeEditorProps = {
  code: string;
  onChange: (code: string) => void;
  disabled?: boolean;
};

export const CodeEditor = memo(({ code, onChange, disabled = false }: CodeEditorProps) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.scrollLeft = editorRef.current.scrollWidth;
    }
  }, [code]);

  return (
    <div className="relative h-full font-mono" style={{ minHeight: '400px' }}>
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-dark-900/50 border-r border-js/10 pt-4 select-none overflow-hidden">
        {code.split('\n').map((_, i) => (
          <div key={i} className="h-[24px] text-right pr-2 text-sm text-gray-500">
            {i + 1}
          </div>
        ))}
      </div>

      <div className="relative ml-12 h-full">
        <SyntaxHighlighter
          language="javascript"
          style={{
            ...vs2015,
            'hljs': { ...vs2015['hljs'], background: 'transparent', color: '#e9e9e9' },
          }}
          customStyle={{
            background: 'transparent',
            padding: '16px',
            margin: 0,
            fontSize: '1rem',
            lineHeight: '24px',
            fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
            whiteSpace: 'pre',
            minHeight: '100%',
            pointerEvents: 'none', 
          }}
          showLineNumbers={false}
          wrapLongLines={false}
        >
          {code}
        </SyntaxHighlighter>

        <textarea
          ref={editorRef}
          value={code}
          onChange={handleChange}
          disabled={disabled}
          spellCheck={false}
          className="absolute left-0 top-0 w-full h-full resize-none outline-none bg-transparent p-4 font-mono text-base leading-[24px] z-20 caret-white"
          style={{
            fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
            whiteSpace: 'pre',
            tabSize: 2,
            minHeight: '100%',
            overflow: 'hidden',
            color: 'transparent',
            caretColor: '#f7df1e',
            lineHeight: '24px',
            padding: '16px',
            margin: 0,
          }}
        />
      </div>
    </div>
  );
});

CodeEditor.displayName = 'CodeEditor';