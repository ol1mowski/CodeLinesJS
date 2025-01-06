export const dashboardContentStyles = {
  card: {
    base: `
      bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80
      backdrop-blur-lg
      border border-gray-700/50
      rounded-xl
      p-6
      transition-all duration-300 ease-out
      hover:shadow-[0_0_25px_rgba(99,102,241,0.1)]
      hover:border-indigo-500/30
      hover:scale-[1.01]
      min-h-[400px]
      relative
      overflow-hidden
    `,
    header: `
      flex items-center justify-between
      mb-6 pb-4
      border-b border-gray-700/50
    `,
    title: `
      font-bold font-space text-xl
      text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400
    `,
  },
  text: {
    heading: `
      font-bold font-space tracking-tight
      text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400
      relative
      after:content-['']
      after:absolute after:bottom-0 after:left-0
      after:w-24 after:h-1
      after:bg-gradient-to-r after:from-blue-500/50 after:to-indigo-500/50
      after:rounded-full
      pb-4
    `,
    subheading: "font-medium font-space text-gray-400",
    primary: "text-gray-200 font-medium",
    secondary: "text-gray-400 text-sm",
  },
  effects: {
    glow: "after:absolute after:inset-0 after:bg-gradient-to-t after:from-indigo-500/5 after:via-transparent after:to-transparent",
  }
}; 