import { LargeTile } from '../LargeTile/LargeTile.component';
import { MediumTile } from '../MediumTile/MediumTile.component';
import { SmallTile } from '../SmallTile/SmallTile.component';

interface TileGridProps {
  position: 'top' | 'bottom';
}

export const TileGrid = ({ position }: TileGridProps) => {
  if (position === 'top') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:row-span-2">
          <LargeTile
            icon="🎯"
            title="Interaktywne Wyzwania"
            description="Rozwiązuj rzeczywiste problemy programistyczne w dynamicznym środowisku nauki"
            variant="yellow"
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <MediumTile
            icon="📊"
            title="Śledzenie Postępów"
            description="Monitoruj swoje osiągnięcia i zobacz jak rozwijają się Twoje umiejętności"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SmallTile
              icon="👥"
              title="Społeczność"
              description="Dołącz do programistów"
            />
            <SmallTile
              icon="🏆"
              title="Certyfikaty"
              description="Zdobywaj osiągnięcia"
            />
            <SmallTile
              icon="💬"
              title="Wsparcie 24/7"
              description="Pomoc przez całą dobę"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <MediumTile
          icon="💻"
          title="Praktyczne Projekty"
          description="Twórz rzeczywiste aplikacje podczas nauki programowania"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SmallTile
            icon="🎓"
            title="Mentoring"
            description="Wsparcie ekspertów"
          />
          <SmallTile
            icon="📁"
            title="Portfolio"
            description="Buduj swoje projekty"
          />
          <SmallTile
            icon="🚀"
            title="Kariera"
            description="Rozwój zawodowy"
          />
        </div>
      </div>

      <div className="lg:row-span-2">
        <LargeTile
          icon="🧠"
          title="Zaawansowane Algorytmy"
          description="Poznaj złożone struktury danych i algorytmy w przystępny sposób"
          variant="yellow"
        />
      </div>
    </div>
  );
}; 