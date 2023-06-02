import mongoose from 'mongoose'

export async function connectMongoose() {
  try {
      await mongoose.connect(process.env['ATLAS_URI'] ?? '')
      console.log('Connected Database Successfully')
  } catch (error) {
      console.log(error.message)
  }
};
