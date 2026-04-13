import mongoose, { Schema } from "mongoose";
import { IPrebooking } from "./prebooking.types.js";

const PrebookingSchema = new Schema<IPrebooking>(
    {
        customer_name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        date_of_birth: { type: Date, required: true },
        license_number: { type: String, required: true },
        license_issue_date: { type: Date, required: true },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        pickup_location: { type: String, required: true },
        rental_reason: { type: String, required: true },
        consent_given: { type: Boolean, required: true },
        consent_timestamp: { type: Date, default: Date.now },
        car_id: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true }, // Assuming 'Vehicle' model name
        agency_id: { type: Schema.Types.ObjectId, ref: "Agency", required: true }, // Assuming 'Agency' model name
        status: {
            type: String,
            enum: ["pending", "confirmed", "completed", "expired", "cancelled"],
            default: "pending",
        },
        payment_method: { 
            type: String, 
            enum: ["pickup", "card"], 
            required: true 
        },
        payment_status: { 
            type: String, 
            enum: ["pending", "paid", "failed"], 
            default: "pending" 
        },
        card_type: { 
            type: String, 
            enum: ["cib", "edahabia", null],
            default: null
        },
        total_price: { type: Number, required: true },
        expires_at: { type: Date, required: true },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

// Index for rapid duplicate submission check
PrebookingSchema.index({ phone: 1, car_id: 1, created_at: -1 });

export const PrebookingModel = mongoose.model<IPrebooking>(
    "Prebooking",
    PrebookingSchema
);
