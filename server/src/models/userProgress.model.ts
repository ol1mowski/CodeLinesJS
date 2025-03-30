// @ts-nocheck
import mongoose from 'mongoose';

const sectionProgressSchema = new mongoose.Schema({
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date
});

const lessonProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  sections: [sectionProgressSchema],
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  earnedRewards: [{
    type: {
      type: String,
      enum: ['xp', 'badge'],
      required: true
    },
    value: Number,
    title: String,
    description: String,
    earnedAt: {
      type: Date,
      default: Date.now
    }
  }],
  lastAccessedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

lessonProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

export const LessonProgress = mongoose.model('LessonProgress', lessonProgressSchema); 