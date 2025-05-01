import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const url = process.env.MONGODB_URL;

export const connectDB = async ()=>{
    try {
        await mongoose.connect(`${url}/food-delivery`,{}).then(()=>console.log("Database connection established!!!"));
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}