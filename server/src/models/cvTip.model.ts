import mongoose from 'mongoose';

const cvTipSchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: true,
      enum: [
        'personal-info',
        'experience',
        'skills',
        'education',
        'projects',
        'achievements',
        'design',
        'content',
      ],
      index: true,
    },
    importance: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    icon: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    examples: {
      good: [
        {
          type: String,
          trim: true,
          maxLength: 500,
        },
      ],
      bad: [
        {
          type: String,
          trim: true,
          maxLength: 500,
        },
      ],
    },
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

cvTipSchema.index({ category: 1, importance: 1 });
cvTipSchema.index({ isPublished: 1, order: 1 });
cvTipSchema.index({ importance: 1, viewCount: -1 });

export const CVTip = mongoose.model('CVTip', cvTipSchema);
