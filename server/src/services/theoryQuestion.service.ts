import { TheoryQuestion, ITheoryQuestion } from '../models/theoryQuestion.model.js';

export interface TheoryQuestionQuery {
  limit?: number;
}

export interface CreateTheoryQuestionDto {
  question: string;
  category: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tags?: string[];
  points?: number;
  estimatedTime?: number;
  isActive?: boolean;
}

class TheoryQuestionService {
  async getRandomTheoryQuestions(query: TheoryQuestionQuery = {}): Promise<ITheoryQuestion[]> {
    const { limit = 10 } = query;

    const questions = await TheoryQuestion.aggregate([
      { $match: { isActive: true } },
      { $sample: { size: limit } },
      {
        $project: {
          question: 1,
          category: 1,
          options: 1,
          tags: 1,
          points: 1,
          estimatedTime: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    return questions;
  }

  async getTheoryQuestionById(id: string): Promise<ITheoryQuestion | null> {
    const question = await TheoryQuestion.findById(id)
      .select('-correctAnswer -explanation')
      .lean()
      .exec();

    return question;
  }

  async checkAnswer(
    id: string,
    answer: number,
  ): Promise<{
    isCorrect: boolean;
    correctAnswer: number;
    explanation: string;
    points: number;
  }> {
    const question = await TheoryQuestion.findById(id).lean().exec();

    if (!question) {
      throw new Error('Pytanie nie zostało znalezione');
    }

    const isCorrect = question.correctAnswer === answer;

    return {
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      points: isCorrect ? question.points : 0,
    };
  }

  async createTheoryQuestion(dto: CreateTheoryQuestionDto): Promise<ITheoryQuestion> {
    const question = new TheoryQuestion(dto);
    return await question.save();
  }

  async createManyTheoryQuestions(dtos: CreateTheoryQuestionDto[]): Promise<ITheoryQuestion[]> {
    const questions = await TheoryQuestion.insertMany(dtos);
    return questions as ITheoryQuestion[];
  }
}

export const theoryQuestionService = new TheoryQuestionService();
