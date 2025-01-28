import mongoose from 'mongoose';

export const lessonSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['javascript', 'react', 'node', 'database', 'testing']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  order: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  requiredLevel: {
    type: Number,
    default: 1,
    min: 1
  },
  points: {
    type: Number,
    default: 10
  },
  requirements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
}); 