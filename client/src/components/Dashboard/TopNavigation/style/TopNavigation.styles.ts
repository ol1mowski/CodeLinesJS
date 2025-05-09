export const topNavigationStyles = {
  container: `
    w-[90%]
    xl:w-full
    flex justify-between items-center
    xl:block
    mt-5
    pb-2
    bg-dark/50 backdrop-blur-sm
    border-b border-js/10 
    fixed top-0
    md:top-4 right-0
    h-14
    z-[0]
    rounded-lg mx-4
  `,
  content: `
    h-full
    ml-32
    sm:ml-auto
    flex justify-between items-center
    max-w-[1000px]
    mx-auto
    relative
  `,
  actions: 'flex items-center gap-3 absolute right-6',
  gradients: {
    text: 'bg-gradient-to-r from-js to-js/80 bg-clip-text text-transparent',
    hover: 'hover:bg-js/5',
    base: 'bg-gradient-to-br from-js/5 to-js/10',
  },
  borders: {
    base: 'border-js/20',
    hover: 'hover:border-js/30',
  },
  transitions: {
    base: 'transition-all duration-200',
  },
  text: {
    heading: 'text-lg font-bold text-js',
    primary: 'text-white',
    secondary: 'text-gray-400',
  },
} as const;
