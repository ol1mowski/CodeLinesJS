export const styles = {
  container: 'bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-4 h-fit shadow-lg',
  nav: 'flex flex-col gap-2',
  button: (isActive: boolean) => `
    flex items-center gap-3 p-3 rounded-lg text-left
    transition-colors duration-200
    ${isActive ? 'bg-js/20 text-js' : 'text-gray-400 hover:text-js hover:bg-js/10'}
  `,
  icon: 'w-5 h-5',
} as const;
