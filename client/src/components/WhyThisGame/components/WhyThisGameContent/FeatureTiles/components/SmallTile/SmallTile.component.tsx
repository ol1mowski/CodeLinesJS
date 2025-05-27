interface SmallTileProps {
  icon: string;
  title: string;
  description: string;
}

export const SmallTile = ({ icon, title, description }: SmallTileProps) => {
  return (
    <div className="bg-[#1a1a1a] text-white rounded-2xl p-6 min-h-[150px] flex flex-col justify-between hover:scale-105 transition-all duration-300 cursor-pointer group border border-gray-700">
      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold font-space mb-2">
          {title}
        </h3>
        <p className="text-sm opacity-80">
          {description}
        </p>
      </div>
    </div>
  );
}; 