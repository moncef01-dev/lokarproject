import { Schema, model } from "mongoose";

const partnershipRequestSchema = new Schema({
    agencyName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ["pending", "approved", "denied"],
        default: "pending"
    },
    timestamp: { type: Date, default: Date.now }
});

export const partnershipRequestModel = model("PartnershipRequest", partnershipRequestSchema);
