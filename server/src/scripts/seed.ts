import mongoose from 'mongoose';
import { Topic } from '../models/topic.model.js';
import { Tag } from '../models/tag.model.js';
import { Group } from '../models/group.model.js';

const initializeCollections = async () => {
  try {
    await Promise.all([
      Topic.createCollection(),
      Tag.createCollection(),
      Group.createCollection()
    ]);

    await Promise.all([
      Topic.createIndexes(),
      Tag.createIndexes(),
      Group.createIndexes()
    ]);

    console.log('Kolekcje zostały zainicjalizowane');
  } catch (error) {
    console.error('Błąd podczas inicjalizacji kolekcji:', error);
    throw error;
  }
};

mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => initializeCollections())
  .then(() => {
    console.log('Inicjalizacja zakończona');
    mongoose.disconnect();
  })
  .catch(error => {
    console.error('Błąd:', error);
    mongoose.disconnect();
  }); 