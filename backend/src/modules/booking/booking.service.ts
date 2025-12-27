import { saveBookingToDB } from "../../dal/booking.dal.js";
import { tryCatch } from "../../utils/try-catch.js";
import { BookingData } from "./booking.schema.js";

export async function createBooking(bookingData: BookingData) {
  const { data, error } = await tryCatch(saveBookingToDB(bookingData));

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
