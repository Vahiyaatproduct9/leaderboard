import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || '');
    } catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    }
};

export default connectDB