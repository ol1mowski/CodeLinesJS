import { motion } from 'framer-motion';
import { CodeLine } from '../types';
import { getSyntaxColor } from '../utils/getSyntaxColor';

type CodeContentProps = {
  code: CodeLine;
};

export const CodeContent = ({ code }: CodeContentProps) => (
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.2 }}
    style={{ paddingLeft: `${code.indent * 20}px` }}
    className={getSyntaxColor(code.line)}
  >
    {code.line}
  </motion.span>
);
