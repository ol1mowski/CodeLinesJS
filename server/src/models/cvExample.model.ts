import mongoose from 'mongoose';

const cvExampleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 1000,
    },
    type: {
      type: String,
      required: true,
      enum: ['full-cv', 'section', 'skill-description', 'project-description'],
      index: true,
    },
    level: {
      type: String,
      required: true,
      enum: ['junior', 'mid', 'senior'],
      index: true,
    },
    field: {
      type: String,
      required: true,
      enum: ['frontend', 'backend', 'fullstack', 'mobile', 'devops'],
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxLength: 5000,
    },
    highlightPoints: [
      {
        type: String,
        trim: true,
        maxLength: 300,
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
        maxLength: 50,
      },
    ],
    isPublished: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    copyCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    helpfulCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

cvExampleSchema.index({ type: 1, level: 1, field: 1 });
cvExampleSchema.index({ isPublished: 1, order: 1 });
cvExampleSchema.index({ level: 1, field: 1 });
cvExampleSchema.index({ viewCount: -1 });

export const CVExample = mongoose.model('CVExample', cvExampleSchema);
