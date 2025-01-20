export const styles = {
  form: "space-y-6",
  confirmationField: "space-y-2",
  label: "block text-gray-400 text-sm sm:text-base",
  hint: "text-sm text-gray-500",
  input: `w-full px-4 py-3 rounded-lg 
    bg-dark/50 border border-js/10 
    text-gray-300 placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-js/50
    text-base sm:text-lg
  `,
  error: "text-red-500 text-sm",
  buttons: "flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-8",
  submitButton: `w-full sm:w-auto order-2 sm:order-1
    px-4 sm:px-6 py-3 rounded-lg
    bg-red-500/20 text-red-400 
    hover:bg-red-500/30
    transition-colors duration-200 shadow-none
    text-sm sm:text-base font-medium
    disabled:opacity-50 disabled:cursor-not-allowed
    whitespace-nowrap
  `,
  cancelButton: `w-full sm:w-auto order-1 sm:order-2
    px-4 sm:px-6 py-3 rounded-lg
    bg-dark/50 text-gray-400
    border border-js/10
    hover:text-js hover:border-js/30
    transition-colors duration-200 shadow-none
    text-sm sm:text-base
    disabled:opacity-50 disabled:cursor-not-allowed
    whitespace-nowrap
  `
} as const; 