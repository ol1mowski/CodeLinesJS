import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
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

export const Lesson = mongoose.model('Lesson', lessonSchema); 