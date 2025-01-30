import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const usersData = [
  {
    username: "testuser",
    email: "test@example.com",
    password: bcrypt.hashSync("hashedpassword123", 10),
    accountType: 'local',
    profile: {
      bio: '',
      socialLinks: {}
    },
    preferences: {
      emailNotifications: true,
      theme: 'dark',
      language: 'pl'
    },
    stats: {
      points: 0,
      completedLessons: [],
      lastActive: new Date()
    }
  }
];

const initializeUserData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Połączono z bazą danych');

    await User.collection.drop().catch(() => console.log('Kolekcja users nie istnieje'));
    console.log('Usunięto starą kolekcję users');

    await User.insertMany(usersData);
    console.log('Dodano przykładowych użytkowników');

    console.log('Inicjalizacja zakończona pomyślnie');
  } catch (error) {
    console.error('Błąd podczas inicjalizacji:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Rozłączono z bazą danych');
  }
};

initializeUserData(); 