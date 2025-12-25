import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      default: "customer",
      type: String,
      enum: ["customer", "agency", "superadmin"],
    },
  },
  { versionKey: false }
);

export const userModel = mongoose.model("User", userSchema);
