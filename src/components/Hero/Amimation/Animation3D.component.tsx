import { useThreeAnimation } from "../../../Hooks/useThreeAnimation.hook";


export const Animation3D = () => {
  const canvasRef = useThreeAnimation();
  
  return (
    <div className="hidden md:flex w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[500px] items-center justify-center">
      <div className="w-full h-full relative">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}; 