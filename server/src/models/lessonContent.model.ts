import mongoose from 'mongoose';

const lessonContentSchema = new mongoose.Schema({
  lessonSlug: {
    type: String,
    required: true,
    ref: 'Lesson'
  },
  xp: {
    type: Number,
    required: true
  },
  rewards: {
    completion: [{
      type: {
        type: String,
        enum: ['xp', 'badge', 'achievement']
      },
      value: Number,
      title: String,
      description: String
    }],
    quiz: [{
      score: Number,
      rewards: [{
        type: {
          type: String,
          enum: ['xp', 'badge', 'achievement']
        },
        value: Number,
        title: String,
        description: String
      }]
    }]
  },
  sections: [{
    title: String,
    content: String,
    examples: [{
      code: String,
      language: String,
      explanation: String
    }]
  }],
  quiz: [{
    id: String,
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String
  }]
}, {
  timestamps: true
});

lessonContentSchema.index({ lessonSlug: 1 });

export const LessonContent = mongoose.model('LessonContent', lessonContentSchema);
export { lessonContentSchema }; 