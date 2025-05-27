interface LargeTileProps {
  icon: string;
  title: string;
  description: string;
  variant: 'yellow' | 'black';
}

export const LargeTile = ({ icon, title, description, variant }: LargeTileProps) => {
  const baseClasses = "rounded-2xl p-8 h-full min-h-[400px] flex flex-col justify-between hover:scale-105 transition-all duration-300 cursor-pointer group";
  const variantClasses = variant === 'yellow' 
    ? "bg-[#f7df1e] text-[#1a1a1a]" 
    : "bg-[#1a1a1a] text-white border border-gray-700";

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <h3 className="text-3xl font-bold font-space mb-4 leading-tight">
          {title}
        </h3>
        <p className="text-lg leading-relaxed opacity-80">
          {description}
        </p>
      </div>
    </div>
  );
}; 