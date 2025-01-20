export const notificationsStyles = {
  dropdown: {
    container: `
      absolute right-0 top-12 w-80 bg-dark/95 rounded-xl 
      border border-js/10 shadow-xl backdrop-blur-sm z-50
    `,
    header: {
      wrapper: "flex justify-between items-center mb-4 p-4",
      title: "text-xl font-bold text-js",
      badge: "px-2 py-1 text-xs bg-js/20 text-js rounded-full"
    },
    content: {
      wrapper: "space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar p-4",
      loading: "py-8 text-center text-gray-400",
      empty: "py-8 text-center text-gray-400",
      item: {
        wrapper: `
          p-3 rounded-lg bg-dark/50 hover:bg-dark/70
          border border-js/10 hover:border-js/20
          cursor-pointer transition-all duration-200
        `,
        content: "flex items-start gap-3",
        icon: "mt-1",
        text: {
          wrapper: "flex-1",
          message: "text-white",
          time: "text-sm text-gray-400 mt-1"
        }
      }
    }
  },
  button: {
    wrapper: "relative",
    base: `
      relative p-2 rounded-lg
      hover:bg-js/5 transition-colors duration-200
    `,
    active: "bg-dark/50",
    icon: {
      base: "w-5 h-5",
      active: "text-js",
      inactive: "text-gray-400"
    },
    badge: `
      absolute -top-1 -right-1 bg-red-500 text-white 
      rounded-full min-w-[18px] h-[18px] text-xs 
      flex items-center justify-center px-1 font-medium
    `
  }
} as const; 