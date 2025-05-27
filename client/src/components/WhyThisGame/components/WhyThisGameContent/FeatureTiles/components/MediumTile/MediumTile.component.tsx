interface MediumTileProps {
  icon: string;
  title: string;
  description: string;
}

export const MediumTile = ({ icon, title, description }: MediumTileProps) => {
  return (
    <div className="bg-[#1a1a1a] text-white rounded-2xl p-8 min-h-[200px] flex items-center hover:scale-105 transition-all duration-300 cursor-pointer group border border-gray-700">
      <div className="flex items-center gap-6 w-full">
        <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold font-space mb-2">
            {title}
          </h3>
          <p className="text-base opacity-80">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}; 