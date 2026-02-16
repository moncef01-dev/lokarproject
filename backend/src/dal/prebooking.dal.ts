import { CreatePrebookingDTO } from "../modules/prebooking/prebooking.types.js";
import { PrebookingModel } from "../modules/prebooking/prebooking.model.js";

export const createPrebookingDAL = async (data: CreatePrebookingDTO) => {
    const prebooking = new PrebookingModel(data);
    return await prebooking.save();
};

export const checkDuplicatePrebookingDAL = async (
    phone: string,
    carId: string
) => {
    // Check for bookings created in the last 10 minutes
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    return await PrebookingModel.findOne({
        phone,
        car_id: carId,
        created_at: { $gte: tenMinutesAgo },
    });
};
