import { lazy, Suspense, memo } from 'react';
import { useParams } from 'react-router-dom';
import { GameContentProvider } from '../../../contexts/GameContentContext';
import { Helmet } from 'react-helmet-async';
import DOMPurify from 'dompurify';

DOMPurify.setConfig({
  FORBID_ATTR: [
    'style',
    'onerror',
    'onload',
    'fscommand',
    'onabort',
    'onafterprint',
    'onanimationend',
    'onanimationiteration',
    'onanimationstart',
    'onblur',
    'oncanplay',
    'oncanplaythrough',
    'onchange',
    'onclick',
    'oncontextmenu',
    'oncopy',
    'oncut',
    'ondblclick',
    'ondrag',
    'ondragend',
    'ondragenter',
    'ondragleave',
    'ondragover',
    'ondragstart',
    'ondrop',
    'ondurationchange',
    'onemptied',
    'onended',
    'onerror',
    'onfocus',
    'onfocusin',
    'onfocusout',
    'onfullscreenchange',
    'onfullscreenerror',
    'ongotpointercapture',
    'oninput',
    'oninvalid',
    'onkeydown',
    'onkeypress',
    'onkeyup',
    'onload',
    'onloadeddata',
    'onloadedmetadata',
    'onloadstart',
    'onlostpointercapture',
    'onmousedown',
    'onmousemove',
    'onmouseout',
    'onmouseover',
    'onmouseup',
    'onmousewheel',
    'onpaste',
    'onpause',
    'onplay',
    'onplaying',
    'onpointercancel',
    'onpointerdown',
    'onpointerenter',
    'onpointerleave',
    'onpointermove',
    'onpointerout',
    'onpointerover',
    'onpointerup',
    'onprogress',
    'onratechange',
    'onreset',
    'onresize',
    'onscroll',
    'onsearch',
    'onseeked',
    'onseeking',
    'onselect',
    'onstalled',
    'onsubmit',
    'onsuspend',
    'ontimeupdate',
    'ontoggle',
    'onvolumechange',
    'onwaiting',
    'onwheel',
  ],
  ADD_TAGS: ['meta'],
  ALLOW_DATA_ATTR: false,
  FORBID_TAGS: ['script', 'object', 'iframe', 'embed', 'base'],
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  SANITIZE_DOM: true,
  WHOLE_DOCUMENT: false,
  USE_PROFILES: {
    html: true,
    mathMl: false,
    svg: false,
  },
});

const gameComponents = {
  'scope-explorer': lazy(() => import('./ScopeExplorer/ScopeExplorer.component')),
  'js-typo-hunter': lazy(() => import('./JSTypoHunter/JSTypoHunter.component')),
  'async-quest': lazy(() => import('./AsyncQuest/AsyncQuest.component')),
  'regex-raider': lazy(() => import('./RegexRaider/RegexRaider.component')),
  'js-quiz': lazy(() => import('./JSQuiz/JSQuiz.component')),
  'method-quiz': lazy(() => import('./MethodQuiz/MethodQuiz.component')),
};

export const GameplayArea = memo(() => {
  const { slug } = useParams<{ slug: string }>();

  const sanitizedSlug = typeof slug === 'string' ? DOMPurify.sanitize(slug) : '';

  if (!sanitizedSlug || !gameComponents[sanitizedSlug as keyof typeof gameComponents]) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400">Gra nie została znaleziona</div>
      </div>
    );
  }

  const GameComponent = gameComponents[sanitizedSlug as keyof typeof gameComponents];

  return (
    <GameContentProvider>
      <Helmet>
        <title>{DOMPurify.sanitize(sanitizedSlug)} | CodeLinesJS</title>
        <meta
          name="description"
          content="Gra CodeLinesJS - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku."
        />
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
