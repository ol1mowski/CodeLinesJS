export const styles = {
  section: 'space-y-4',
  title: 'text-lg sm:text-xl font-medium text-gray-200 flex items-center gap-2',
  icon: 'text-js text-xl sm:text-2xl',
  optionsContainer: 'space-y-4 ml-4 sm:ml-8',
  optionLabel: `flex items-start sm:items-center gap-3 hover:cursor-pointer group
    transition-colors duration-200`,
  checkbox: `w-5 h-5 rounded border-gray-600 bg-gray-700 text-js 
    focus:ring-js/50 mt-1 sm:mt-0`,
  optionText: 'group-hover:text-js transition-colors duration-200',
  optionTitle: 'block text-gray-200 text-base sm:text-lg',
  optionDescription: 'block text-sm text-gray-400 mt-1',
} as const;
