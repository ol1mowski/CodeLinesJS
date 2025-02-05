import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
      enum: ["local", "google"],
      default: "local",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    avatar: String,
    profile: {
      displayName: String,
      bio: String,
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
        enum: ["light", "dark"],
        default: "dark",
      },
      language: {
        type: String,
        enum: ["pl", "en"],
        default: "pl",
      },
    },
    stats: {
      points: { type: Number, default: 0 },
      level: { type: Number, default: 1 },
      xp: { type: Number, default: 0 },
      streak: { type: Number, default: 0 },
      pointsToNextLevel: { type: Number, default: 1000 },
      bestStreak: { type: Number, default: 0 },
      lastActive: { type: Date },
      learningPaths: [
        {
          pathId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LearningPath",
          },
          status: {
            type: String,
            enum: ["active", "completed", "locked"],
            default: "locked",
          },
          progress: {
            completedLessons: [
              {
                lessonId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Lesson",
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
              ref: "Lesson",
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
            enum: ["javascript", "react", "node", "database", "testing"],
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
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
