// @ts-nocheck
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

console.log('[post.model] Inicjalizacja modelu Post');

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

console.log('[post.model] Dodawanie pluginu mongoose-paginate-v2');
postSchema.plugin(mongoosePaginate);

console.log('[post.model] Definiowanie metody paginate');
// Rejestrujemy metodę paginate i weryfikujemy, że działa
postSchema.statics.paginate = function() {
  console.log('[post.model.paginate] Wywołanie metody paginate z argumentami:', arguments);
  const result = mongoosePaginate.paginate.apply(this, arguments);
  console.log('[post.model.paginate] Rezultat wywołania paginate:', result);
  return result;
};

console.log('[post.model] Tworzenie modelu Post');
export const Post = mongoose.model('Post', postSchema);
console.log('[post.model] Model Post utworzony'); 