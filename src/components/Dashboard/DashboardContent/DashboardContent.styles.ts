export const dashboardContentStyles = {
  card: {
    base: `
      bg-gradient-to-br from-dark/80 via-dark/50 to-dark/80
      backdrop-blur-lg
      border border-js/10
      rounded-xl
      p-6
      transition-all duration-300 ease-out
      hover:shadow-[0_0_25px_rgba(247,223,30,0.1)]
      hover:border-js/30
      hover:scale-[1.01]
      min-h-[400px]
      relative
      overflow-hidden
    `,
    header: `
      flex items-center justify-between
      mb-6 pb-4
      border-b border-js/10
    `,
    title: `
      font-bold font-space text-xl
      text-js
    `,
  },
  text: {
    heading: `
      font-bold font-space tracking-tight
      text-js
      relative
      after:content-['']
      after:absolute after:bottom-0 after:left-0
      after:w-24 after:h-1
      after:bg-js/50
      after:rounded-full
      pb-4
    `,
    subheading: "font-medium font-space text-gray-400",
    primary: "text-gray-200 font-medium",
    secondary: "text-gray-400 text-sm",
  },
  effects: {
    glow: "after:absolute after:inset-0 after:bg-gradient-to-t after:from-js/5 after:via-transparent after:to-transparent",
  }
}; 