import { motion } from "framer-motion";
import { CodeLine } from '../types';
import { LineNumber } from './LineNumber.component';
import { CodeContent } from './CodeContent.component';
import { BlinkingCursor } from './BlinkingCursor.component';

type AnimatedCodeLineProps = {
  lineNumber: number;
  code: CodeLine;
  showCursor: boolean;
};

export const AnimatedCodeLine = ({ lineNumber, code, showCursor }: AnimatedCodeLineProps) => (
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.2 }}
    className="whitespace-pre relative"
  >
    <LineNumber number={lineNumber} />
    <CodeContent code={code} />
    {showCursor && <BlinkingCursor />}
  </motion.span>
); 