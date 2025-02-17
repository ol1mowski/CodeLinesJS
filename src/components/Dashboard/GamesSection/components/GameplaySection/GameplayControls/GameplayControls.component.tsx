import { memo } from 'react';
import { FaVolumeMute, FaVolumeUp, FaExpand, FaCompress } from 'react-icons/fa';
import { GameplayControls as Controls } from '../../../types/gameplay.types';

type GameplayControlsProps = {
  controls: Controls;
  onPauseToggle: () => void;
  onFullscreenToggle: () => void;
  onVolumeChange: (volume: number) => void;
};

export const GameplayControls = memo(({ 
  controls, 
  onFullscreenToggle, 
  onVolumeChange 
}: GameplayControlsProps) => {
  return (
    <div className="p-4 rounded-lg bg-dark-800/50 border border-js/10">
      <div className="space-y-4">
        <button
          onClick={onFullscreenToggle}
          className="w-full p-2 rounded-lg bg-js/10 text-js hover:bg-js/20 transition-colors flex items-center justify-center gap-2"
        >
          {controls.isFullscreen ? <FaCompress /> : <FaExpand />}
          <span>{controls.isFullscreen ? 'Wyjdź' : 'Pełny ekran'}</span>
        </button>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-js">
            <FaVolumeMute />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={controls.volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              className="w-24 accent-js"
            />
            <FaVolumeUp />
          </div>
        </div>
      </div>
    </div>
  );
}); 