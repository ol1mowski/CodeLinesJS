import mongoose from 'mongoose';

const lessonContentSchema = new mongoose.Schema({
  lessonId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  xp: Number,
  rewards: {
    completion: [{
      type: { type: String },
      value: Number,
      title: String,
      description: String
    }],
    quiz: mongoose.Schema.Types.Mixed
  },
  sections: [{
    title: String,
    content: String,
    examples: [{
      code: String,
      language: String,
      explanation: String
    }],
    quiz: [{
      id: String,
      question: String,
      options: [String],
      correctAnswer: Number,
      explanation: String
    }]
  }]
});

export const LessonContent = mongoose.model('LessonContent', lessonContentSchema);
export { lessonContentSchema }; 