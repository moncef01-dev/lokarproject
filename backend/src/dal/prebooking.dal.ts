import { CreatePrebookingDTO, IPrebooking } from "../modules/prebooking/prebooking.types.js";
import { PrebookingModel } from "../modules/prebooking/prebooking.model.js";

export const createPrebookingDAL = async (data: any) => {
    const prebooking = new PrebookingModel(data);
    return await prebooking.save();
};

export const checkDuplicatePrebookingDAL = async (
    phone: string,
    carId: string,
    startDate: Date
) => {
    return await PrebookingModel.findOne({
        phone,
        car_id: carId,
        start_date: startDate,
        status: "pending",
    });
};

/**
 * Checks if a car is already booked for the given period.
 * Excludes cancelled and expired bookings.
 */
export const checkOverlapPrebookingDAL = async (
    carId: string,
    startDate: Date,
    endDate: Date
) => {
    return await PrebookingModel.findOne({
        car_id: carId,
        status: { $nin: ["cancelled", "expired"] },
        $and: [
            { start_date: { $lt: endDate } },
            { end_date: { $gt: startDate } },
        ],
    });
};

export const getPrebookingById = async (id: string) => {
    return await PrebookingModel.findById(id);
};

export const getPrebookingsByAgencyIdDAL = async (
    agencyId: string,
    query: { search?: string; sort?: string } = {}
) => {
    const filter: any = { agency_id: agencyId };

    if (query.search) {
        const searchRegex = new RegExp(query.search, "i");
        filter.$or = [
            { customer_name: searchRegex },
            { email: searchRegex },
            { phone: searchRegex },
        ];
    }

    let sortOptions: any = { created_at: -1 }; // Default: Newest first
    if (query.sort === "date_asc") sortOptions = { created_at: 1 };
    if (query.sort === "name_asc") sortOptions = { customer_name: 1 };

    return await PrebookingModel.find(filter).sort(sortOptions);
};

export const deletePrebookingDAL = async (id: string) => {
    return await PrebookingModel.findByIdAndDelete(id);
};

export const updatePrebookingDAL = async (id: string, data: Partial<IPrebooking>) => {
    return await PrebookingModel.findByIdAndUpdate(id, data, { new: true });
};
