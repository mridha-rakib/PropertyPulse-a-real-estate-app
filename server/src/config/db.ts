import mongoose from "mongoose";
import config from '@/config/env.config'


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.database_url!);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
