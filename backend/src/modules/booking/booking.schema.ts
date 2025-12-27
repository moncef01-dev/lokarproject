import { z } from "zod";

export const bookingSchema = z
  .object({
    customer_id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid customer_id"),
    agency_id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid agency_id"),
    vehicle_id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid vehicle_id"),

    start_date: z.coerce.date(),
    end_date: z.coerce.date(),

    price: z.number().positive(),

    status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
  })
  .refine((data) => data.end_date > data.start_date, {
    message: "end_date must be after start_date",
    path: ["end_date"],
  });
