import { CreatePrebookingDTO } from "./prebooking.types.js";
import {
    createPrebookingDAL,
    checkDuplicatePrebookingDAL,
} from "../../dal/prebooking.dal.js";
import { vehicleModel } from "../vehicle/vehicle.model.js";

export const createPrebookingService = async (data: CreatePrebookingDTO) => {
    // 1. Check if car exists
    const car = await vehicleModel.findById(data.car_id);
    if (!car) {
        throw new Error("Car not found");
    }

    // 2. Check for duplicate submissions (same phone, same car, last 10 mins)
    const duplicate = await checkDuplicatePrebookingDAL(data.phone, data.car_id);
    if (duplicate) {
        throw new Error(
            "You have already submitted a request for this car recently. Please wait."
        );
    }

    // 3. Create prebooking
    // Ensure dates are Date objects if they aren't already (though Zod & DTO usually handle string -> Date conversion in DAL/Model if setup)
    // Our model expects Dates, DTO has strings. Mongoose casts automatically, but let's be safe if needed.
    // The DAL takes the DTO and passes it to Mongoose constructor which handles casting.

    const prebooking = await createPrebookingDAL(data);
    return prebooking;
};
