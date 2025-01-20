export const styles = {
  form: "space-y-6",
  section: "space-y-6",
  sectionTitle: "text-lg font-medium text-gray-200 flex items-center gap-2",
  sectionIcon: "text-js",
  optionsContainer: "space-y-4 ml-8",
  optionLabel: "flex items-center gap-3 hover:cursor-pointer group",
  checkbox: "w-4 h-4 rounded border-gray-600 bg-gray-700 text-js focus:ring-js/50",
  optionText: "group-hover:text-js transition-colors duration-200",
  optionTitle: "block text-gray-200",
  optionDescription: "block text-sm text-gray-400",
  select: `w-full max-w-xs px-4 py-2 
    bg-dark/50 border border-js/10 rounded-lg 
    text-gray-300 
    focus:ring-2 focus:ring-js/50 focus:border-transparent 
    transition-colors`,
  buttonContainer: "flex justify-end gap-4 pt-4"
} as const; 