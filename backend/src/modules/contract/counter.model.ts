import mongoose, { Schema, Document } from "mongoose";

export interface ICounter extends Document {
    _id: any; // We'll use the date string "YYYYMMDD" as the ID to reset daily
    seq: number;
}

const CounterSchema = new Schema<ICounter>({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
});

export const CounterModel = mongoose.model<ICounter>("Counter", CounterSchema);

/**
 * Get the next contract number in format LOK-YYYYMMDD-XXXX
 * Uses atomic findOneAndUpdate to ensure concurrency safety.
 */
export const getNextContractNumber = async (): Promise<string> => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}${mm}${dd}`; // "20260216"

    // Atomic increment: if document doesn't exist, create it with seq=1.
    // if it exists, increment seq.
    const counter = await CounterModel.findByIdAndUpdate(
        dateStr,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    const sequence = String(counter.seq).padStart(4, "0");
    return `LOK-${dateStr}-${sequence}`;
};
