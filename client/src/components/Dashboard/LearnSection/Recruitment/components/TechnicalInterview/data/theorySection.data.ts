export type QuestionOption = {
  value: number;
  label: string;
  time: string;
};

export const questionOptions: QuestionOption[] = [
  { value: 5, label: '5 pytań', time: '~5 min' },
  { value: 10, label: '10 pytań', time: '~10 min' },
  { value: 15, label: '15 pytań', time: '~15 min' },
  { value: 20, label: '20 pytań', time: '~20 min' },
];

export const testInfo = {
  topics: 'podstawy JavaScript, hoisting, closures, prototypy, event loop, ES6+',
  details: [
    {
      title: 'Format',
      description: 'Pytania wielokrotnego wyboru',
    },
    {
      title: 'Czas',
      description: 'Bez ograniczeń czasowych',
    },
    {
      title: 'Wynik',
      description: 'Natychmiastowa ocena',
    },
  ],
}; 