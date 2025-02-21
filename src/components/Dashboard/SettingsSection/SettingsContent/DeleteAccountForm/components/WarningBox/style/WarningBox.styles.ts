export const styles = {
  container: `
    bg-red-500/10 border border-red-500/20 rounded-lg p-4 sm:p-6 mb-6
    backdrop-blur-sm
  `,
  content: "flex flex-col sm:flex-row items-start gap-4",
  icon: "text-red-500 text-xl sm:text-2xl mt-1 flex-shrink-0",
  title: "text-red-400 font-medium text-lg sm:text-xl mb-2",
  list: `
    text-gray-400 space-y-2 list-disc list-inside
    text-sm sm:text-base leading-relaxed
  `
} as const; 