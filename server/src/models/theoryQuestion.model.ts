import mongoose from 'mongoose';

export interface ITheoryQuestion extends mongoose.Document {
  question: string;
  category: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tags: string[];
  points: number;
  estimatedTime: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const theoryQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
      maxLength: 500,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    options: [
      {
        type: String,
        required: true,
        trim: true,
        maxLength: 200,
      },
    ],
    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
    explanation: {
      type: String,
      required: true,
      trim: true,
      maxLength: 1000,
    },
    tags: [
      {
        type: String,
        trim: true,
        maxLength: 50,
      },
    ],
    points: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
      default: 10,
    },
    estimatedTime: {
      type: Number,
      required: true,
      min: 30,
      max: 300,
      default: 60,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

theoryQuestionSchema.index({ category: 1 });
theoryQuestionSchema.index({ isActive: 1 });
theoryQuestionSchema.index({ tags: 1 });

export const TheoryQuestion = mongoose.model<ITheoryQuestion>(
  'TheoryQuestion',
  theoryQuestionSchema,
);
