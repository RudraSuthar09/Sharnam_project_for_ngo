import dotenv from "dotenv";
dotenv.config()
import express from "express"
import cors from "cors"
import mongoose from "mongoose";

export const connectDB =async()=>{
    await mongoose.connect('mongodb+srv://sutharrudra9390:rudra9390@cluster0.vznyu.mongodb.net/Sharnam/').then(()=>console.log("DB connected"));
}
// mongoose.connect(process.env.MONGO_URI)