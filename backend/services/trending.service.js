import { Topic } from '../models/topic.model.js';
import { Tag } from '../models/tag.model.js';

export const getTopics = async () => {
  return await Topic.find()
    .sort({ count: -1 })
    .limit(10);
};

export const getTags = async () => {
  return await Tag.find()
    .sort({ count: -1 })
    .limit(10);
};

export const incrementTopicCount = async (topicName) => {
  await Topic.findOneAndUpdate(
    { name: topicName },
    { $inc: { count: 1 } },
    { upsert: true }
  );
};

export const incrementTagCount = async (tagName) => {
  await Tag.findOneAndUpdate(
    { name: tagName },
    { $inc: { count: 1 } },
    { upsert: true }
  );
}; 