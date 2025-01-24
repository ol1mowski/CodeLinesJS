import { memo } from 'react';
import { CodeBlock } from '../../../UI/CodeBlock/CodeBlock.component';
import { type CodeExample as CodeExampleType } from '../../../types/lesson.types';


type CodeExampleProps = {
  example: CodeExampleType;
  index: number;
};

export const CodeExample = memo(({ example, index }: CodeExampleProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium text-gray-200">
      Przykład {index + 1}:
    </h3>
    <CodeBlock
      code={example.code}
      language={example.language || "javascript"}
      showLineNumbers
      className="rounded-lg border border-js/10"
    />
    {example.explanation && (
      <p className="text-gray-400 text-sm">
        {example.explanation}
      </p>
    )}
  </div>
)); 