import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  password: {
    type: String,
    required: function() {
      return this.accountType === 'local';
    }
  },
  accountType: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  avatar: String,
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: Date,
  profile: {
    displayName: String,
    bio: String,
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String
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
      }
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
    lastActive: Date
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