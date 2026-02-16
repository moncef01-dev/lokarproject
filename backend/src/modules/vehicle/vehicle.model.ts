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
    img_path: { type: String },
    year: { type: String },
    price: { type: Number },
    availability: { type: String, default: "available" },
  },
  { versionKey: false }
);

export const vehicleModel = mongoose.model("Vehicle", vehicleSchema);
