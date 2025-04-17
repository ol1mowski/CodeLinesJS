export type JSQuestion = {
  id: number;
  question: string;
  code: string;
  options: string[];
  correctAnswer: number;
};

export type JSGameProps = {
  onComplete: (score: number) => void;
};
