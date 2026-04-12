import { z } from "zod";

export const vehicleSchema = z.object({
  agency_id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, {
      message: "Invalid MongoDB ObjectId",
    })
    .optional(),

  brand: z.string().min(1, { message: "Brand is required" }),

  model: z.string().min(1, { message: "Model is required" }),
  
  category: z.string().optional(),
  
  is_luxury: z.union([z.boolean(), z.string().transform(v => v === "true")]).optional(),

  year: z.string().optional(),

  price: z.coerce.number().nonnegative().optional(),

  specs: z
    .object({
      fuel: z.string().optional(),
      transmission: z.string().optional(),
      seats: z.coerce.number().int().positive().optional(),
    })
    .optional(),

  img_path: z.string().optional(),

  availability: z.string().default("available"),
});

export type VehicleData = z.infer<typeof vehicleSchema>;
