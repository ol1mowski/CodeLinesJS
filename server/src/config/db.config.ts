// @ts-nocheck
import mongoose from "mongoose";
import config from "./config.js";
import { initializeModels } from '../models/index.js';

export const connectDB = async () => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  try {
    await mongoose.connect(config.db.uri as string, {
      ...config.db.options,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    initializeModels();
    
    console.log('Połączono z bazą danych MongoDB');
    return true;
  } catch (err) {
    console.error('Błąd połączenia z bazą danych:', (err as Error).message);
    
    if (isProduction) {
      setTimeout(connectDB, 5000);
    }
    
    return false;
  }
}; 