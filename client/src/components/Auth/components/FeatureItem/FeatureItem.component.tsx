type FeatureItemProps = {
  text: string;
  description?: string;
  icon?: string;
};

export const FeatureItem = ({ text, description, icon = "⚡" }: FeatureItemProps) => (
  <div className="flex items-start justify-center lg:justify-start gap-3 sm:gap-4">
    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#f7df1e] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
      <span className="text-black text-sm sm:text-base font-bold">{icon}</span>
    </div>
    <div className="flex flex-col text-center lg:text-left">
      <span className="text-white font-semibold text-base sm:text-lg">{text}</span>
      {description && (
        <span className="text-gray-300 text-sm sm:text-base mt-1">{description}</span>
      )}
    </div>
  </div>
);
