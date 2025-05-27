interface CTAIconProps {
  icon: string;
}

export const CTAIcon = ({ icon }: CTAIconProps) => {
  return (
    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 text-center">
      {icon}
    </div>
  );
}; 