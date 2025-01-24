import { memo } from "react";
import { motion } from "framer-motion";
import { CodeBlock } from "../../UI/CodeBlock/CodeBlock.component";
import type { LessonSection } from "../../types/lesson.types";

interface LessonContentProps {
  sections: LessonSection[];
}

export const LessonContent = memo(({ sections }: LessonContentProps) => {
  return (
    <div className="space-y-12">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-js">
            {section.title}
          </h2>
          
          <div className="prose prose-invert prose-js max-w-none">
            {section.content}
          </div>

          {section.examples?.map((example, exIndex) => (
            <div key={exIndex} className="space-y-4">
              <h3 className="text-lg font-medium text-gray-200">
                Przykład {exIndex + 1}:
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
          ))}
        </motion.div>
      ))}
    </div>
  );
});

LessonContent.displayName = "LessonContent"; 