import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  earnedAt: {
    type: Date,
    default: Date.now
  }
});

const statsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  level: {
    type: Number,
    default: 1
  },
  experiencePoints: {
    type: Number,
    default: 0
  },
  nextLevelThreshold: {
    type: Number,
    default: 1000
  },
  completedChallenges: {
    type: Number,
    default: 0
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  bestStreak: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  totalTimeSpent: {
    type: Number,
    default: 0
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  badges: [badgeSchema],
  unlockedFeatures: [{
    type: String,
    enum: ['custom_themes', 'create_challenges']
  }],
  daily: [{
    date: String,
    points: Number,
    challenges: Number
  }],
  categories: [{
    name: String,
    completed: Number,
    total: Number
  }]
}, { timestamps: true });

export const Stats = mongoose.model('Stats', statsSchema); 