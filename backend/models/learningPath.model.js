import mongoose from 'mongoose';

export const learningPathSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  totalLessons: {
    type: Number,
    required: true
  },
  estimatedTime: Number,
  requirements: [String],
  outcomes: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const LearningPath = mongoose.model('LearningPath', learningPathSchema); 