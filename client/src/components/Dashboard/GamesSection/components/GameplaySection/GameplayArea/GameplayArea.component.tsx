import { lazy, Suspense, memo } from 'react';
import { useParams } from 'react-router-dom';
import { GameContentProvider } from '../../../contexts/GameContentContext';
import { Helmet } from 'react-helmet-async';

const gameComponents = {
  'scope-explorer': lazy(() => import('./ScopeExplorer/ScopeExplorer.component')),
  'js-typo-hunter': lazy(() => import('./JSTypoHunter/JSTypoHunter.component')),
  'async-quest': lazy(() => import('./AsyncQuest/AsyncQuest.component')),
  'regex-raider': lazy(() => import('./RegexRaider/RegexRaider.component'))
};

export const GameplayArea = memo(() => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !gameComponents[slug as keyof typeof gameComponents]) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400">Gra nie została znaleziona</div>
      </div>
    );
  }

  const GameComponent = gameComponents[slug as keyof typeof gameComponents];
  
  return (
    <GameContentProvider>
      <Helmet>
        <title> {slug} | CodeLinesJS</title>
        <meta name="description" content="Gra CodeLinesJS - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku." />
      </Helmet>
      <div className="w-full h-full">
        <Suspense fallback={<div>Ładowanie gry...</div>}>
          <GameComponent />
        </Suspense>
      </div>
    </GameContentProvider>
  );
});

GameplayArea.displayName = 'GameplayArea'; 