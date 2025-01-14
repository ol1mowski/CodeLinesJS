export const statsOverviewStyles = {
  container: "space-y-6",
  grid: "grid grid-cols-1 sm:grid-cols-2 gap-4",
  card: {
    wrapper: "p-6 rounded-xl bg-dark/50 backdrop-blur-sm border border-js/10 transition-all duration-300 hover:border-js/20",
    content: "flex items-center gap-4",
    icon: "w-12 h-12 rounded-xl flex items-center justify-center",
    text: "flex flex-col",
    label: "text-gray-400 text-sm",
    value: "text-2xl font-bold text-white",
    subValue: "text-sm text-gray-400 mt-1"
  }
} as const; 