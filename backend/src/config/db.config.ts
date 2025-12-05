import mongoose from "mongoose";
import { getDbURL } from "./index.js";

export const connectDB = async () => {
  try {
    const DB_URL = getDbURL();
    await mongoose.connect(DB_URL);
    console.log("DB Connected Successfully!");
  } catch (error: any) {
    console.log("DB Connection Failed: ", error.message);
  }
};
