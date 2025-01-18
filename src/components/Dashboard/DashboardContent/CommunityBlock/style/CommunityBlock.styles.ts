export const communityBlockStyles = {
  container: "bg-dark/50 backdrop-blur-sm rounded-xl border border-js/10 p-6",
  header: {
    wrapper: "flex justify-between items-center mb-6",
    title: "text-xl font-bold text-js flex items-center gap-2",
    icon: "w-5 h-5"
  },
  notifications: {
    list: "space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar",
    item: {
      wrapper: "flex items-start gap-3 p-3 rounded-lg bg-dark/30 border border-js/5 hover:border-js/10 transition-colors",
      avatar: "w-8 h-8 rounded-full bg-js/10 flex items-center justify-center text-js",
      content: "flex-1",
      username: "font-medium text-js",
      message: "text-gray-400 text-sm",
      time: "text-xs text-gray-500 mt-1"
    },
    empty: "text-center text-gray-400 py-8"
  }
} as const; 