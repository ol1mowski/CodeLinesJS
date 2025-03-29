import mongoose from "mongoose";
import { User } from "../models/user.model.js";
// @ts-ignore
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const usersData = [
  {
    username: "testuser",
    email: "test@example.com",
    password: bcrypt.hashSync("hashedpassword123", 10),
    accountType: "local",
    isEmailVerified: false,
    profile: {
      bio: "",
      socialLinks: {},
    },
    preferences: {
      emailNotifications: true,
      theme: "dark",
      language: "pl",
    },
    stats: {
      points: 0,
      level: 1,
      learningPaths: [
        {
          pathId: "679c77e3eacc8fe9e4ddf18b",
          status: "active",
          progress: {
            completedLessons: 0,
            totalLessons: 0,
            lastLesson: null,
            lastActivity: new Date(),
            startedAt: new Date(),
            completedAt: null,
          },
        },
      ],
      streak: 0,
      bestStreak: 0,
      lastActive: new Date(),
    },
  },
];

const initializeUserData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log("Połączono z bazą danych");

    await User.collection
      .drop()
      .catch(() => console.log("Kolekcja users nie istnieje"));
    console.log("Usunięto starą kolekcję users");

    await User.insertMany(usersData);
    console.log("Dodano przykładowych użytkowników");

    console.log("Inicjalizacja zakończona pomyślnie");
  } catch (error) {
    console.error("Błąd podczas inicjalizacji:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Rozłączono z bazą danych");
  }
};

initializeUserData();
