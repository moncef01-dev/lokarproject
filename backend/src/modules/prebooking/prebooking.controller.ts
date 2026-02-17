import { Request, Response } from "express";
import { CreatePrebookingSchema } from "./prebooking.validation.js";
import { createPrebookingService, getAgencyPrebookingsService, deletePrebookingService, updatePrebookingStatusService } from "./prebooking.service.js";
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

        if (error.message.includes("already booked")) {
            return res.status(409).json({
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

export const getAgencyPrebookingsController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const search = req.query.search as string | undefined;
        const sort = req.query.sort as string | undefined;
        const prebookings = await getAgencyPrebookingsService(userId, {
            ...(search && { search }),
            ...(sort && { sort })
        });
        res.json(prebookings);
    } catch (error: any) {
        if (error.message === "Agency profile not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error("Get Agency Prebookings Error:", error);
        res.status(500).json({ message: "Error fetching prebookings" });
    }
};

export const deletePrebookingController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });
        const finalUserId: string = userId;

        const { id } = req.params;
        console.log(`[DEBUG] Received Delete request for Prebooking ID: '${id}'`);
        await deletePrebookingService(finalUserId, id as string);
        res.json({ success: true, message: "Prebooking deleted successfully" });
    } catch (error: any) {
        console.error("Delete Prebooking Error:", error);
        res.status(error.message.includes("Unauthorized") ? 403 : 500).json({ message: error.message });
    }
};

export const updatePrebookingStatusController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });
        const finalUserId: string = userId;

        const { id } = req.params;
        const { status } = req.body;
        console.log(`[DEBUG] Received Update Status request for Prebooking ID: '${id}', New Status: '${status}'`);

        if (!["pending", "confirmed", "completed", "expired", "cancelled"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const result = await updatePrebookingStatusService(finalUserId, id as string, status);
        res.json({ success: true, data: result });
    } catch (error: any) {
        console.error("Update Prebooking Status Error:", error);
        res.status(error.message.includes("Unauthorized") ? 403 : 500).json({ message: error.message });
    }
};
