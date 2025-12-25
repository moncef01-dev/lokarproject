import mongoose from "mongoose";

const agencySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  img_path: { type: String },
  created_at: { type: Date, default: Date.now },
});

export const agencyModel = mongoose.model("Agency", agencySchema);
