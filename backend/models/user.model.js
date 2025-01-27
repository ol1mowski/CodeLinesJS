import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: function() {
      return this.accountType === 'local';
    },
    minlength: 6
  },
  profile: {
    bio: {
      type: String,
      maxlength: 500,
      default: ''
    },
    avatar: {
      type: String,
      default: '/uploads/avatars/default-avatar.png'
    },
    language: {
      type: String,
      enum: ['pl', 'en'],
      default: 'pl'
    }
  },
  accountType: {
    type: String,
    enum: ['local', 'google', 'github'],
    default: 'local'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    pushNotifications: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    language: {
      type: String,
      enum: ['pl', 'en'],
      default: 'pl'
    }
  },
  stats: {
    completedChallenges: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    }],
    totalPoints: {
      type: Number,
      default: 0
    },
    streak: {
      type: Number,
      default: 0
    },
    lastActive: {
      type: Date,
      default: Date.now
    },
    progress: {
      currentLevel: {
        type: Number,
        default: 1
      },
      experiencePoints: {
        type: Number,
        default: 0
      },
      nextLevelThreshold: {
        type: Number,
        default: 100
      },
      achievements: [{
        type: String,
        enum: ['first_lesson', 'first_path', 'streak_3', 'streak_7', 'streak_30']
      }],
      categories: [{
        name: {
          type: String,
          required: true
        },
        completed: {
          type: Number,
          default: 0
        },
        total: {
          type: Number,
          default: 0
        }
      }],
      dailyStats: [{
        date: {
          type: Date,
          required: true
        },
        pointsEarned: {
          type: Number,
          default: 0
        },
        lessonsCompleted: {
          type: Number,
          default: 0
        }
      }]
    }
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.accountType === 'local') {
    this.password = await bcrypt.hash(this.password, 10);
  }

  if (!this.stats.progress.categories.length) {
    this.stats.progress.categories = [
      { name: 'javascript', completed: 0, total: 20 },
      { name: 'react', completed: 0, total: 15 },
      { name: 'node', completed: 0, total: 10 },
      { name: 'database', completed: 0, total: 8 },
      { name: 'testing', completed: 0, total: 7 }
    ];
  }

  if (!this.stats.progress.dailyStats.length) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    this.stats.progress.dailyStats = [{
      date: today,
      pointsEarned: 0,
      lessonsCompleted: 0
    }];
  }

  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  if (this.accountType !== 'local') return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema); 