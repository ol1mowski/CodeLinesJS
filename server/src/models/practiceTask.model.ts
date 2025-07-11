import mongoose from 'mongoose';

export interface IPracticeTask extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  estimatedTime: number;
  taskContent: string;
  solution: string;
  tips: string[];
  tags: string[];
  isActive: boolean;
  completions: {
    count: number;
    users: mongoose.Schema.Types.ObjectId[];
  };

  createdAt: Date;
  updatedAt: Date;
}

const practiceTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 500,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        'Manipulacja stringów',
        'Manipulacja tablicami',
        'Rekurencja i algorytmy',
        'Funkcje wyższego rzędu',
        'Manipulacja obiektami',
        'Asynchroniczność',
        'Inne',
      ],
    },
    estimatedTime: {
      type: Number,
      required: true,
      min: 1,
      max: 180, // max 3 godziny
    },
    taskContent: {
      type: String,
      required: true,
      trim: true,
      maxLength: 2000,
    },
    solution: {
      type: String,
      required: true,
      trim: true,
      maxLength: 5000,
    },
    tips: [
      {
        type: String,
        trim: true,
        maxLength: 300,
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        maxLength: 50,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    completions: {
      count: {
        type: Number,
        default: 0,
      },
      users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

practiceTaskSchema.index({ difficulty: 1, category: 1 });
practiceTaskSchema.index({ tags: 1 });
practiceTaskSchema.index({ isActive: 1 });
practiceTaskSchema.index({ title: 'text', description: 'text', tags: 'text' });

practiceTaskSchema.methods.addCompletion = function (userId: mongoose.Schema.Types.ObjectId) {
  if (!this.completions.users.includes(userId)) {
    this.completions.users.push(userId);
    this.completions.count += 1;
  }
};

practiceTaskSchema.statics.getRandomTasks = function (
  limit: number = 10,
  filters: Record<string, unknown> = {},
) {
  const matchStage = { isActive: true, ...filters };

  return this.aggregate([
    { $match: matchStage },
    { $sample: { size: limit } },
    {
      $project: {
        title: 1,
        description: 1,
        difficulty: 1,
        category: 1,
        estimatedTime: 1,
        taskContent: 1,
        tips: 1,
        tags: 1,
        completions: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);
};

practiceTaskSchema.statics.getTaskWithoutSolution = function (id: string) {
  return this.findById(id).select('-solution').lean().exec();
};

practiceTaskSchema.statics.getCategories = function () {
  return this.distinct('category', { isActive: true });
};

practiceTaskSchema.statics.getTags = function () {
  return this.distinct('tags', { isActive: true });
};

export const PracticeTask = mongoose.model<IPracticeTask>('PracticeTask', practiceTaskSchema);
