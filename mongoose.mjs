import mongoose from 'mongoose';
import { logger } from './logger.js';

export async function connectMongoose() {
  try {
    const uri = `${process.env.ATLAS_URI}`;
    await mongoose.connect(uri);
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Failed to connect to MongoDB Atlas');
    }
    logger('Connected to MongoDB Atlas successfully');
    logger('Happy Coding! 🚀');
  } catch (error) {
    console.log(error.message);
  }
}
