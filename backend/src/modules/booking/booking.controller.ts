import { Request, Response } from "express";
import { tryCatch } from "../../utils/try-catch.js";
import { createBooking } from "./booking.service.js";

export async function bookingHandler(req: Request, res: Response) {
  const bookingData = req.booking;

  if (!bookingData) {
    res.status(400).send("Invalid Booking Data!");
    return;
  }

  const { data, error } = await tryCatch(createBooking(bookingData));
  if (error) {
    res.status(500).send("Something went wrong");
    return;
  }
  res.status(201).send("Booking created successfully " + (data as any)._id);
}
