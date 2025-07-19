import { motion } from 'framer-motion';
import { useMobileDetect } from '../../hooks/useMobileDetect.hook';

type PhonePreviewProps = {
  position?: 'left' | 'right';
  title: string;
  className?: string;
  showFrame?: boolean;
  isAbsolute?: boolean;
  image?: string;
};

export const PhonePreview: React.FC<PhonePreviewProps> = ({
  position = 'right',
  title,
  className = '',
  showFrame = false,
  isAbsolute = true,
  image = 'https://res.cloudinary.com/dbbuav0rj/image/upload/v1742282966/CodeLinesJs/learn_cljs_nttqge.png',
}) => {
  const isMobile = useMobileDetect();
  const initialX = position === 'right' ? 50 : -50;
  const rotate = position === 'right' ? 12 : -12;
  const rotateY = position === 'right' ? -10 : 10;

  const glowPositions =
    position === 'right'
      ? { top: { right: '-5px' }, bottom: { left: '-5px' } }
      : { top: { left: '-5px' }, bottom: { right: '-5px' } };

  const PhoneFrame = () => (
    <div className="relative w-[220px] md:w-[240px] lg:w-[260px]">
      <div
        className="relative z-10 w-full aspect-[9/19] bg-black rounded-[30px] border-[6px] border-gray-800 shadow-2xl overflow-hidden"
        style={{
          transform: isAbsolute ? `rotateX(5deg) rotateY(${rotateY}deg)` : 'none',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(247, 223, 30, 0.2)',
        }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-20"></div>

        <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
          {image ? (
            <div className="w-full h-full overflow-hidden">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="text-center p-4">
              <div className="w-14 h-14 bg-[#f7df1e] rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-black text-xl font-bold">JS</span>
              </div>
              <h4 className="text-white font-bold mb-1 text-sm">{title}</h4>
              <p className="text-gray-400 text-xs">Tutaj pojawi się zrzut ekranu z aplikacji</p>
            </div>
          )}
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-30 rounded-[30px] z-20 pointer-events-none"></div>
      </div>

      {isAbsolute && (
        <>
          <div
            className="absolute top-1/3 w-16 h-16 bg-[#f7df1e]/20 rounded-full blur-xl"
            style={{
              [glowPositions.top.right ? 'right' : 'left']:
                glowPositions.top.right || glowPositions.top.left,
            }}
          ></div>
          <div
            className="absolute bottom-1/3 w-16 h-16 bg-[#f7df1e]/20 rounded-full blur-xl"
            style={{
              [glowPositions.bottom.right ? 'right' : 'left']:
                glowPositions.bottom.right || glowPositions.bottom.left,
            }}
          ></div>
        </>
      )}
    </div>
  );

  if (showFrame) {
    return (
      <div className={className}>
        <div className="relative w-[200px]">
          <div className="relative z-10 w-full aspect-[9/19] bg-black rounded-[30px] border-[6px] border-gray-800 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-20"></div>
            <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
              {image ? (
                <div className="w-full h-full overflow-hidden">
                  <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="text-center p-4">
                  <div className="w-14 h-14 bg-[#f7df1e] rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-black text-xl font-bold">JS</span>
                  </div>
                  <h4 className="text-white font-bold mb-1 text-sm">{title}</h4>
                  <p className="text-gray-400 text-xs">Tutaj pojawi się zrzut ekranu z aplikacji</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className={className} style={{ perspective: '1000px' }}>
        <PhoneFrame />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, rotate: 0 }}
      whileInView={{ opacity: 1, x: 0, rotate: rotate }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className={className}
      style={{ perspective: '1000px' }}
    >
      <PhoneFrame />
    </motion.div>
  );
};
