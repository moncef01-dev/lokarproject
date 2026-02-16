import { Request, Response } from "express";
import { CreatePrebookingSchema } from "./prebooking.validation.js";
import { createPrebookingService } from "./prebooking.service.js";
import { z } from "zod";

export const createPrebookingController = async (
    req: Request,
    res: Response
) => {
    try {
        // 1. Validate Input
        const validatedData = CreatePrebookingSchema.parse({ body: req.body });
        const prebookingData: any = validatedData.body; // Explicit cast to avoid exactOptionalPropertyTypes compilation issues if strictly typed without undefined

        // 2. Call Service
        const result = await createPrebookingService(prebookingData);

        // 3. Send Response
        res.status(201).json({
            success: true,
            message:
                "Your request has been sent to the agency. Please contact the agency within 24 hours to confirm your booking.",
            data: result,
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: error.issues, // ZodError usually has .issues or .errors, checking .issues is safer for Zod v3+
            });
        }

        if (error.message === "Car not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message.includes("already submitted")) {
            return res.status(429).json({
                success: false,
                message: error.message,
            });
        }

        console.error("Prebooking Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
