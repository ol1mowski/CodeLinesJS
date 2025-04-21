import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import config from '../config/config.js';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    avatar: String,
    profile: {
      displayName: String,
      bio: String,
      avatar: String,
      socialLinks: {
        github: String,
        linkedin: String,
        twitter: String,
      },
    },
    preferences: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'dark',
      },
      language: {
        type: String,
        enum: ['pl', 'en'],
        default: 'pl',
      },
    },
    groups: [
      {
        groupId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Group',
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
        role: {
          type: String,
          enum: ['member', 'moderator', 'admin'],
          default: 'member',
        },
        notifications: {
          type: Boolean,
          default: true,
        },
        lastActivity: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    stats: {
      points: { type: Number, default: 0 },
      level: { type: Number, default: 1 },
      xp: { type: Number, default: 0 },
      streak: { type: Number, default: 0 },
      pointsToNextLevel: { type: Number, default: 1000 },

      bestStreak: { type: Number, default: 0 },
      lastActive: { type: Date },
      experiencePoints: { type: Number, default: 0 },
      nextLevelThreshold: { type: Number, default: 1000 },
      completedChallenges: { type: Number, default: 0 },
      currentStreak: { type: Number, default: 0 },
      averageScore: { type: Number, default: 0 },
      totalTimeSpent: { type: Number, default: 0 },
      badges: [
        {
          name: { type: String, default: 'Odznaka' },
          icon: { type: String, default: '🏆' },
          earnedAt: { type: Date, default: Date.now },
          description: { type: String, default: 'Odznaka za osiągnięcie' },
        },
      ],
      unlockedFeatures: [String],
      chartData: {
        daily: [
          {
            date: String,
            points: { type: Number, default: 0 },
            timeSpent: { type: Number, default: 0 },
          },
        ],
        progress: [
          {
            name: String,
            progress: { type: Number, default: 0 },
            timeSpent: { type: Number, default: 0 },
          },
        ],
      },
      learningPaths: [
        {
          pathId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LearningPath',
          },
          status: {
            type: String,
            enum: ['active', 'completed', 'locked'],
            default: 'locked',
          },
          progress: {
            completedLessons: [
              {
                lessonId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Lesson',
                },
                completedAt: {
                  type: Date,
                  default: Date.now,
                },
              },
            ],
            totalLessons: Number,
            lastLesson: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Lesson',
            },
            lastActivity: Date,
            startedAt: Date,
            completedAt: Date,
          },
        },
      ],
      categories: [
        {
          name: {
            type: String,
            enum: ['javascript', 'react', 'node', 'database', 'testing'],
          },
          progress: {
            type: Number,
            default: 0,
          },
          level: {
            type: Number,
            default: 1,
          },
        },
      ],
      daily: [
        {
          date: String,
          points: { type: Number, default: 0 },
          challenges: { type: Number, default: 0 },
        },
      ],
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    lastLogin: Date,
    isActive: {
      type: Boolean,
      default: false,
      index: true,
    },
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (
    this.isModified('password') &&
    !this.password.startsWith('$2a$') &&
    !this.password.startsWith('$2b$')
  ) {
    const saltRounds = config.security.bcryptSaltRounds || 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    this.passwordChangedAt = new Date();
  }
  next();
});

userSchema.methods.changedPasswordAfter = function (jwtTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);

    if (
      this.createdAt &&
      Math.abs(this.createdAt.getTime() - this.passwordChangedAt.getTime()) < 5000
    ) {
      return false;
    }

    return jwtTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  if (!candidatePassword || !this.password) {
    return false;
  }
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Błąd podczas porównywania haseł');
    return false;
  }
};

export const User = mongoose.model('User', userSchema);
