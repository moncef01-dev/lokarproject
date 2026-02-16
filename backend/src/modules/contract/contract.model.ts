import mongoose, { Schema, Document } from "mongoose";

export interface IContract extends Document {
    contract_number: string;
    storage_path: string; // Relative path to storage
    prebooking_id: mongoose.Types.ObjectId;
    agency_id: mongoose.Types.ObjectId;
    generated_at: Date;
}

const ContractSchema = new Schema<IContract>(
    {
        contract_number: { type: String, required: true, unique: true },
        storage_path: { type: String, required: true },
        prebooking_id: {
            type: Schema.Types.ObjectId,
            ref: "Prebooking",
            required: true,
        },
        agency_id: { type: Schema.Types.ObjectId, ref: "Agency", required: true },
        generated_at: { type: Date, default: Date.now },
    },
    {
        timestamps: true, // Adds createdAt, updatedAt
    }
);

// Indexes for faster lookup
ContractSchema.index({ agency_id: 1 });
ContractSchema.index({ prebooking_id: 1 });

export const ContractModel = mongoose.model<IContract>(
    "Contract",
    ContractSchema
);
