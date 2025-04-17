import { SYNTAX_COLORS } from '../constants';

export const getSyntaxColor = (line: string): string => {
  if (line.startsWith('//')) return SYNTAX_COLORS.comment;
  if (line.startsWith('function')) return SYNTAX_COLORS.function;
  if (line.startsWith('const')) return SYNTAX_COLORS.constant;
  if (line.includes('return')) return SYNTAX_COLORS.return;
  if (line.includes('=>')) return SYNTAX_COLORS.arrow;
  if (line.includes('`')) return SYNTAX_COLORS.string;
  if (line.includes('console.log')) return SYNTAX_COLORS.console;

  return SYNTAX_COLORS.default;
};
