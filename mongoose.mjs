import mongoose from 'mongoose';

export async function connectMongoose() {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log('Connected to Database Successfully');
  } catch (error) {
    console.error('Error connecting to database:', error); 
  }
}
