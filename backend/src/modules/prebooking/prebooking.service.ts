import { CreatePrebookingDTO } from "./prebooking.types.js";
import {
    createPrebookingDAL,
    checkDuplicatePrebookingDAL,
    checkOverlapPrebookingDAL,
    getPrebookingsByAgencyIdDAL,
} from "../../dal/prebooking.dal.js";
import { vehicleModel } from "../vehicle/vehicle.model.js";
import { agencyModel } from "../agency/agency.model.js";

export const createPrebookingService = async (data: CreatePrebookingDTO) => {
    // 1. Check if car exists
    const car = await vehicleModel.findById(data.car_id);
    if (!car) {
        throw new Error("Car not found");
    }

    const start = new Date(data.start_date);
    const end = new Date(data.end_date);

    // 2. Check for duplicate submissions (same phone, same car, same start date, status=pending)
    const duplicate = await checkDuplicatePrebookingDAL(data.phone, data.car_id, start);
    if (duplicate) {
        throw new Error(
            "You have already submitted a pending request for this car and date."
        );
    }

    // 3. Check for overlap (Double Booking Prevention)
    const overlap = await checkOverlapPrebookingDAL(data.car_id, start, end);
    if (overlap) {
        throw new Error(
            "This car is already booked or requested for the selected dates."
        );
    }

    // 4. Calculate expires_at (24 hours from now)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // 5. Create prebooking
    const prebooking = await createPrebookingDAL({
        ...data,
        expires_at: expiresAt,
        status: "pending",
    });
    return prebooking;
};

export const getAgencyPrebookingsService = async (
    userId: string,
    query: { search?: string; sort?: string } = {}
) => {
    // 1. Find Agency by User ID
    const agency = await agencyModel.findOne({ user_id: userId });
    if (!agency) {
        throw new Error("Agency profile not found");
    }

    // 2. Fetch Prebookings with filter/sort
    return await getPrebookingsByAgencyIdDAL(agency._id.toString(), query);
};
