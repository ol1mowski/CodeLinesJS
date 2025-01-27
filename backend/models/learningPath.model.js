import mongoose from 'mongoose';

const learningPathSchema = new mongoose.Schema({
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
  estimatedTime: Number,
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  requirements: [{
    type: String
  }],
  outcomes: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const LearningPath = mongoose.model('LearningPath', learningPathSchema); 