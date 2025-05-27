import { TileGrid } from './components/TileGrid/TileGrid.component';

export const FeatureTiles = () => {
  return (
    <div className="w-full">
      <TileGrid position="top" />
      <TileGrid position="bottom" />
    </div>
  );
}; 