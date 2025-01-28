import mongoose from 'mongoose';

export const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['article', 'video', 'tutorial', 'documentation', 'tool']
  },
  category: {
    type: String,
    required: true,
    enum: ['javascript', 'react', 'node', 'database', 'testing']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    name: String,
    url: String
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  requiredLevel: {
    type: Number,
    default: 1,
    min: 1
  },
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

resourceSchema.index({ category: 1, type: 1 });
resourceSchema.index({ tags: 1 });

export const Resource = mongoose.model('Resource', resourceSchema); 