import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

console.log("🔍 MONGO_URI from .env:", process.env.MONGO_URI); // Debugging

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};
