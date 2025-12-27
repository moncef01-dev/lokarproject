import { bookingModel } from "../modules/booking/booking.model.js";
import { BookingData } from "../modules/booking/booking.schema.js";
import { tryCatch } from "../utils/try-catch.js";

export async function saveBookingToDB(bookingData: BookingData) {
  const {
    customer_id,
    agency_id,
    vehicle_id,
    start_date,
    end_date,
    price,
    status,
  } = bookingData;
  const { data, error } = await tryCatch(
    bookingModel.create({
      customer_id,
      agency_id,
      vehicle_id,
      start_date,
      end_date,
      price,
      status, // Optional, defaults to 'pending' in model
    } as any)
  );

  if (error) {
    throw new Error("Something went wrong when creating booking");
  }
  return data;
}
