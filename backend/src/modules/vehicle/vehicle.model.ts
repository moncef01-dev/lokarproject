import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    agency_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
      required: true,
    },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    category: { type: String },
    is_luxury: { type: Boolean, default: false },
    img_path: { type: String },
    year: { type: String },
    price: { type: Number },
    specs: {
      fuel: { type: String },
      transmission: { type: String },
      seats: { type: Number },
    },
    availability: { type: String, default: "available" },
  },
  { versionKey: false },
);

export const vehicleModel = mongoose.model("Vehicle", vehicleSchema);
