type CTAVariant = 'primary' | 'secondary' | 'challenge' | 'beginner';

interface CTAStyles {
  container: string;
  button: string;
  secondaryButton?: string;
}

export const useCTAStyles = (variant: CTAVariant): CTAStyles => {
  switch (variant) {
    case 'primary':
      return {
        container: "bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-400 text-black",
        button: "bg-[#f7df1e] hover:bg-yellow-400 text-black font-bold",
        secondaryButton: "bg-black/20 hover:bg-black/30 text-black border border-black/30"
      };
    case 'challenge':
      return {
        container: "bg-gradient-to-br from-red-900 via-red-800 to-red-700 text-white border border-red-600",
        button: "bg-red-600 hover:bg-red-500 text-white font-bold"
      };
    case 'beginner':
      return {
        container: "bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white border border-green-600",
        button: "bg-green-600 hover:bg-green-500 text-white font-bold"
      };
    case 'secondary':
      return {
        container: "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white border border-blue-600",
        button: "bg-[#f7df1e] hover:bg-yellow-400 text-black font-bold"
      };
    default:
      return {
        container: "bg-[#1a1a1a] text-white border border-gray-700",
        button: "bg-[#f7df1e] hover:bg-yellow-400 text-black font-bold"
      };
  }
}; 