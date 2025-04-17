import { FaCode, FaTools, FaRocket, FaBrain, FaServer } from 'react-icons/fa';

export const roadmapSteps = [
  {
    title: 'Podstawy JavaScript',
    description: 'Poznaj fundamenty języka i podstawowe koncepcje programowania.',
    Icon: FaCode,
    topics: ['Zmienne', 'Typy danych', 'Operatory', 'Funkcje', 'Obiekty'],
  },
  {
    title: 'Zaawansowane Koncepcje',
    description: 'Zgłęb bardziej złożone aspekty języka JavaScript.',
    Icon: FaBrain,
    topics: ['Closures', 'Prototypes', 'This', 'Scope', 'Hoisting'],
  },
  {
    title: 'Nowoczesny JavaScript',
    description: 'Poznaj najnowsze funkcje i możliwości języka.',
    Icon: FaTools,
    topics: ['ES6+', 'Modules', 'Destructuring', 'Async/Await', 'Classes'],
  },
  {
    title: 'Zaawansowane API',
    description: 'Naucz się korzystać z zaawansowanych interfejsów programistycznych.',
    Icon: FaServer,
    topics: ['DOM API', 'Fetch API', 'Canvas'],
  },
  {
    title: 'Projekty Praktyczne',
    description: 'Wykorzystaj zdobytą wiedzę w prawdziwych projektach.',
    Icon: FaRocket,
    topics: ['Aplikacje SPA', 'REST API', 'Optymalizacja', 'Testing'],
  },
];
