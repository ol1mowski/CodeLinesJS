type FeatureItemProps = {
  text: string;
};

export const FeatureItem = ({ text }: FeatureItemProps) => (
  <div className="flex items-center justify-center md:justify-start bg-[#f7df1e]/10 rounded-lg p-3">
    <span className="text-[#f7df1e] font-medium">✓ {text}</span>
  </div>
);
