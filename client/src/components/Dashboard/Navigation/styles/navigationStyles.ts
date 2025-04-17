export const navigationStyles = {
  button: {
    base: `
      w-full flex items-center gap-3 px-4 py-3 
      rounded-lg transition-all duration-200
      backdrop-blur-sm
    `,
    variants: {
      default: {
        active: 'bg-js/20 border-l-2 border-js text-js',
        inactive: 'text-gray-400 hover:text-js hover:bg-js/10',
      },
      danger: {
        active: 'bg-red-500/20 text-red-400',
        inactive: 'text-red-400 hover:bg-red-500/10',
      },
    },
  },
  section: {
    title: 'text-xs font-bold text-js/60 uppercase tracking-wider px-3 mb-2',
    divider: 'border-t border-js/5 mx-3 my-4',
  },
  logo: {
    container: 'px-4 mb-8',
    icon: 'w-10 h-10 min-w-[40px] rounded-xl bg-js/20 flex items-center justify-center',
    text: 'font-bold text-js font-space',
  },
};
