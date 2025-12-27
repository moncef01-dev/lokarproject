import { Request, Response, NextFunction } from "express";
import { bookingSchema } from "./booking.schema.js";
export function validateBookingData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validationResult = bookingSchema.safeParse(req.body);

  if (!validationResult.success) {
    res.status(400).send("Invalid Booking Data");
    return;
  }
  req.body = validationResult.data;
  next();
}
