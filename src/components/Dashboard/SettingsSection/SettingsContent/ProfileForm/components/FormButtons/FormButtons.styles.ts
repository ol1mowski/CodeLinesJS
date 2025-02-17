export const styles = {
  container: `flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4
    w-full sm:w-auto mt-6 sm:mt-8`,
  
  cancelButton: `w-full sm:w-auto order-1 sm:order-none
    px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg
    bg-dark/50 text-gray-400
    border border-js/10 hover:border-js/30 hover:bg-dark/60
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200 shadow-none
    text-sm sm:text-base font-medium
  `,
  
  submitButton: `w-full sm:w-auto
    px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg
    bg-js text-dark
    hover:bg-js/90
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200
    text-sm sm:text-base font-medium
    flex items-center justify-center
  `
} as const; 