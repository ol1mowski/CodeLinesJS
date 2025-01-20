export const styles = {
  form: "space-y-6",
  buttonContainer: "flex justify-end gap-4",
  cancelButton: `px-6 py-2 rounded-lg
    bg-dark/50 text-gray-400
    border border-js/10
    hover:text-js hover:bg-dark/50 hover:border-js/30
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200 shadow-none`,
  submitButton: `px-6 py-2 rounded-lg
    bg-js text-dark font-medium
    hover:bg-js/90
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200`
} as const; 