// @ts-nocheck
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
  category: {
    type: String,
    required: true,
    enum: ['javascript', 'react', 'node', 'database', 'testing']
  },
  totalLessons: {
    type: Number,
    required: true
  },
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  estimatedTime: Number,
  requirements: [String],
  outcomes: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  requiredLevel: {
    type: Number,
    default: 1,
    min: 1
  }
}, {
  timestamps: true
});

export const LearningPath = mongoose.model('LearningPath', learningPathSchema); 