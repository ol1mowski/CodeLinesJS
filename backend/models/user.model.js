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
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'dark'
    },
    language: {
      type: String,
      enum: ['pl', 'en'],
      default: 'pl'
    }
  },
  stats: {
    completedChallenges: {
      type: Number,
      default: 0
    },
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
    }
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.accountType === 'local') {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  if (this.accountType !== 'local') return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema); 