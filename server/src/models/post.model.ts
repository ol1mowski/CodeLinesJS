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

// Dodanie pluginu paginacji do schematu
postSchema.plugin(mongoosePaginate);

// Dodanie interface dla dokumentu paginacji - zgodny z mongoose-paginate-v2
postSchema.statics.paginate = function() {
  return mongoosePaginate.paginate.apply(this, arguments);
};

export const Post = mongoose.model('Post', postSchema); 