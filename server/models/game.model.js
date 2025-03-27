import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 500
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard', 'expert'],
    default: 'medium'
  },
  requiredLevel: {
    type: Number,
    default: 1,
    min: 1
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  completions: {
    count: {
      type: Number,
      default: 0
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  rewardPoints: {
    type: Number,
    required: true,
    min: 0
  },
  gameData: {
    type: Array,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    required: true,
    enum: ['basics', 'challenges', 'algorithms', 'syntax', 'variables', 'async', 'debugging', 'regex']
  },
  estimatedTime: {
    type: Number, 
    required: true
  }
}, {
  timestamps: true
});

gameSchema.methods.updateRating = function(newRating) {
  this.rating.total += newRating;
  this.rating.count += 1;
  this.rating.average = this.rating.total / this.rating.count;
};

export const Game = mongoose.model('Game', gameSchema); 