import mongoose from "mongoose";
import { getDbURL } from "./index.js";

export const connectDB = async () => {
  try {
    const DB_URL = getDbURL();

    console.log("Using URI:", DB_URL); // debug

    await mongoose.connect(DB_URL, {
      dbName: "lokar", // 🔥 FORCE DATABASE
    });

    console.log("DB Connected Successfully!");
    console.log("DB NAME:", mongoose.connection.name); // 🔥 confirm
  } catch (error: any) {
    console.log("DB Connection Failed: ", error.message);
  }
};