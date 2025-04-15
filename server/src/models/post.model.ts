// @ts-nocheck
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  likes: {
    count: {
      type: Number,
      default: 0
    },
    userIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    isLiked: {
      type: Boolean,
      default: false
    }
  },
  comments: [{
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

postSchema.plugin(mongoosePaginate);

postSchema.statics.paginate = function() {
  const result = mongoosePaginate.paginate.apply(this, arguments);
  return result;
};

export const Post = mongoose.model('Post', postSchema);
