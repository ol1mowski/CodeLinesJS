export const styles = {
  container: `space-y-6`,
  
  field: `space-y-2`,
  
  label: `block text-gray-400 
    text-sm sm:text-base 
    font-medium`,
  
  input: `w-full px-4 py-3 rounded-lg 
    bg-dark/50 border border-js/10 
    text-gray-300 placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-js/50
    text-sm sm:text-base
    transition-colors duration-200`,
  
  error: "text-red-500 text-sm mt-1"
} as const; 