import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
    index: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 1000
  },
  attachments: [{
    type: String,
    url: String,
    name: String
  }],
  isEdited: {
    type: Boolean,
    default: false
  },
  readBy: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

messageSchema.index({ groupId: 1, createdAt: -1 });

export const Message = mongoose.model('Message', messageSchema); 