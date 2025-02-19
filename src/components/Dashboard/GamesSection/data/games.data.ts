import { Game } from '../types/games.type';
import { ScopeExplorer } from '../components/GameplaySection/GameplayArea/ScopeExplorer/ScopeExplorer.component';
import { JSTypoHunter } from '../components/GameplaySection/GameplayArea/JSTypoHunter/JSTypoHunter.component';
import { AsyncQuest } from '../components/GameplaySection/GameplayArea/AsyncQuest/AsyncQuest.component';

export const games: Game[] = [
  {
    id: 'scope-explorer',
    name: 'Scope Explorer',
    description: 'Odkryj tajemnice zasięgu zmiennych w JavaScript',
    component: ScopeExplorer,
    difficulty: 'medium',
    category: 'fundamentals'
  },
  {
    id: 'js-typo-hunter',
    name: 'JS Typo Hunter',
    description: 'Znajdź i napraw błędy składniowe w kodzie',
    component: JSTypoHunter,
    difficulty: 'easy',
    category: 'syntax'
  },
  {
    id: 'async-quest',
    name: 'Async Quest',
    description: 'Opanuj asynchroniczność w JavaScript',
    component: AsyncQuest,
    difficulty: 'hard',
    category: 'async'
  }
]; 