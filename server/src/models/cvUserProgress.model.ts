import mongoose from 'mongoose';

const cvUserProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    tips: {
      viewed: [
        {
          tipId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CVTip',
            required: true,
          },
          viewedAt: {
            type: Date,
            default: Date.now,
          },
          isHelpful: {
            type: Boolean,
            default: null,
          },
        },
      ],
      totalViewed: {
        type: Number,
        default: 0,
      },
      categories: {
        content: { type: Number, default: 0 },
        skills: { type: Number, default: 0 },
        projects: { type: Number, default: 0 },
        design: { type: Number, default: 0 },
      },
    },
    examples: {
      viewed: [
        {
          exampleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CVExample',
            required: true,
          },
          viewedAt: {
            type: Date,
            default: Date.now,
          },
          copied: {
            type: Boolean,
            default: false,
          },
          copiedAt: {
            type: Date,
            default: null,
          },
        },
      ],
      totalViewed: {
        type: Number,
        default: 0,
      },
      totalCopied: {
        type: Number,
        default: 0,
      },
    },
    templates: {
      viewed: [
        {
          templateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CVTemplate',
            required: true,
          },
          viewedAt: {
            type: Date,
            default: Date.now,
          },
          downloaded: {
            type: Boolean,
            default: false,
          },
          downloadedAt: {
            type: Date,
            default: null,
          },
        },
      ],
      totalViewed: {
        type: Number,
        default: 0,
      },
      totalDownloaded: {
        type: Number,
        default: 0,
      },
    },
    completedSections: [
      {
        sectionId: {
          type: String,
          required: true,
          enum: ['content-tips', 'technical-tips', 'design-tips', 'examples'],
        },
        completedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    stats: {
      totalTimeSpent: {
        type: Number,
        default: 0, // in minutes
      },
      lastActivityAt: {
        type: Date,
        default: Date.now,
      },
      completionPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

cvUserProgressSchema.index({ userId: 1 });
cvUserProgressSchema.index({ 'stats.lastActivityAt': -1 });
cvUserProgressSchema.index({ 'stats.completionPercentage': -1 });

export const CVUserProgress = mongoose.model('CVUserProgress', cvUserProgressSchema);
