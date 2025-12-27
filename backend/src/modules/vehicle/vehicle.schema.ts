import { z } from "zod";

export const vehicleSchema = z.object({
  agency_id: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "Invalid MongoDB ObjectId",
  }),

  brand: z.string().min(1, { message: "Brand is required" }),

  model: z.string().min(1, { message: "Model is required" }),

  year: z.string().optional(),

  img_path: z.string().optional(),

  availability: z.string().default("available"),
});

export type VehicleData = z.infer<typeof vehicleSchema>;
