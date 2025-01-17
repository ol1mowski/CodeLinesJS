export const statsBlockStyles = {
  container: "bg-dark/50 backdrop-blur-sm rounded-xl border border-js/10 p-6",
  stats: {
    grid: "grid grid-cols-1 sm:grid-cols-2 gap-4",
    item: {
      wrapper: "flex items-center gap-4 p-4 bg-dark/30 rounded-lg",
      icon: "text-2xl text-js",
      content: {
        wrapper: "flex flex-col",
        label: "text-sm text-gray-400",
        value: "text-xl font-bold text-js"
      }
    }
  },
  lastActive: "text-sm text-gray-400 mt-4"
} as const; 