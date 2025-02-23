export const blockStyles = {
  container: "bg-dark/50 backdrop-blur-sm rounded-xl border border-js/10 p-6",
  header: {
    wrapper: "flex justify-between items-center mb-6",
    title: "text-xl font-bold text-js flex items-center gap-2",
    icon: "w-5 h-5"
  },
  content: {
    wrapper: "space-y-6",
    description: "text-gray-400 text-sm leading-relaxed",
    button: {
      wrapper: "flex justify-center",
      base: "px-6 py-3 bg-js text-dark font-medium rounded-lg transition-all duration-200",
      hover: "hover:bg-js/90 hover:shadow-lg hover:shadow-js/20",
      active: "active:scale-95"
    }
  }
} as const; 