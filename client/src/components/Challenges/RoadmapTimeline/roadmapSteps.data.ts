import { FaCode, FaLayerGroup, FaReact, FaServer } from 'react-icons/fa';
import { RoadmapStep } from './types';

export const roadmapSteps: RoadmapStep[] = [
  {
    title: 'Podstawy JavaScript',
    description: 'Poznaj fundamenty języka, zmienne, typy danych, funkcje i struktury kontrolne.',
    duration: '4 tygodnie',
    icon: FaCode,
    skills: ['Zmienne', 'Funkcje', 'Obiekty', 'Tablice', 'Pętle'],
  },
  {
    title: 'Zaawansowany JS',
    description:
      'Zagłęb się w zaawansowane koncepcje jak asynchroniczność i programowanie funkcyjne.',
    duration: '6 tygodni',
    icon: FaLayerGroup,
    skills: ['Promise', 'Async/Await', 'Closures', 'ES6+'],
  },
  {
    title: 'Framework React',
    description: 'Naucz się budować nowoczesne aplikacje z wykorzystaniem React.',
    duration: '8 tygodni',
    icon: FaReact,
    skills: ['Components', 'Hooks', 'State', 'Props', 'Context'],
  },
  {
    title: 'Full Stack',
    description: 'Połącz frontend z backendem, poznaj Node.js i bazy danych.',
    duration: '10 tygodni',
    icon: FaServer,
    skills: ['Node.js', 'Express', 'MongoDB', 'REST API'],
  },
];
