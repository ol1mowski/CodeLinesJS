type FeatureItemProps = {
  text: string;
  icon?: string;
};

export const FeatureItem = ({ text, icon = "⚡" }: FeatureItemProps) => (
  <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#f7df1e] rounded-full flex items-center justify-center flex-shrink-0">
      <span className="text-black text-xs sm:text-sm font-bold">{icon}</span>
    </div>
    <span className="text-white font-medium text-sm sm:text-base">{text}</span>
  </div>
);
