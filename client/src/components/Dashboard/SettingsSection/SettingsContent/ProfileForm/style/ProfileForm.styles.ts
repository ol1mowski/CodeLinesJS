export const styles = {
  form: `w-full max-w-2xl sm:ml-0 sm:mr-auto 
    space-y-8 px-4 sm:px-0`,

  usernameContainer: `flex flex-col gap-4`,

  container: `bg-dark/30 backdrop-blur-sm rounded-xl 
    p-4 sm:p-6 md:p-8 border border-js/10 
    space-y-6 md:space-y-8`,

  header: `flex flex-col md:flex-row gap-6 md:gap-8`,

  infoSection: `w-full md:w-2/3 space-y-6`,

  bioSection: `space-y-4`,

  bioLabel: `block text-gray-400 
    text-sm sm:text-base 
    font-medium`,

  bioTextarea: `w-full px-4 py-3 rounded-lg 
    bg-dark/50 border border-js/10 
    text-gray-300 placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-js/50
    text-sm sm:text-base 
    min-h-[120px] max-h-[240px] 
    resize-y
    transition-colors duration-200`,

  error: 'text-red-500 text-sm mt-1',
  
  successMessage: 'text-green-500 mt-2 text-sm font-medium'
} as const;
