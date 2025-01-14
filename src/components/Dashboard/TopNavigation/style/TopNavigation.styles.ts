export const topNavigationStyles = {
  container: `
    w-full bg-dark/50 backdrop-blur-sm
    border-b border-js/10 px-8 py-4
    sticky top-0 z-50
  `,
  content: `
    max-w-screen-2xl mx-auto
    flex justify-between items-center
  `,
  actions: "flex items-center gap-4",
  gradients: {
    text: "bg-gradient-to-r from-js to-js/80 bg-clip-text text-transparent",
    hover: "hover:bg-js/5",
    base: "bg-gradient-to-br from-js/5 to-js/10"
  },
  borders: {
    base: "border-js/20",
    hover: "hover:border-js/30"
  },
  transitions: {
    base: "transition-all duration-200"
  },
  text: {
    heading: "text-xl font-bold text-js",
    primary: "text-white",
    secondary: "text-gray-400"
  }
} as const; 