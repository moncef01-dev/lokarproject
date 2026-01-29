import { z } from "zod";
import { Types } from "mongoose";

export const agencySchema = z.object({
  user_id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, {
      message: "Invalid MongoDB ObjectId",
    })
    .optional(),

  name: z.string().min(1, { message: "Name is required" }),

  phone: z.string().min(1, { message: "Phone is required" }),

  email: z.email({ message: "Invalid email address" }),

  address: z.string(),

  img_path: z.string().optional(),

  //   created_at: z.date().optional(),
});

export type AgencyData = z.infer<typeof agencySchema>;
