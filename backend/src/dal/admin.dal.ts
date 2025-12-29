import { agencyModel } from "../modules/agency/agency.model.js";
import { bookingModel } from "../modules/booking/booking.model.js";
import { vehicleModel } from "../modules/vehicle/vehicle.model.js";
import { tryCatch } from "../utils/try-catch.js";
import mongoose from "mongoose";

export async function getAgencyStatsDAL(agencyId: string) {
  const { data, error } = await tryCatch(
    Promise.all([
      vehicleModel.countDocuments({ agency_id: agencyId }),
      bookingModel.countDocuments({ agency_id: agencyId }),
      bookingModel.aggregate([
        { $match: { agency_id: new mongoose.Types.ObjectId(agencyId), status: "confirmed" } },
        { $group: { _id: null, totalProfit: { $sum: "$price" } } },
      ]),
    ])
  );

  if (error) {
    throw new Error("Error fetching agency stats");
  }

  const [vehicleCount, bookingCount, profitResult] = data;
  const totalProfit = profitResult[0]?.totalProfit || 0;

  return {
    vehicleCount,
    bookingCount,
    totalProfit,
  };
}

export async function getSuperAdminStatsDAL() {
  const { data, error } = await tryCatch(
    Promise.all([
      agencyModel.countDocuments({}),
      vehicleModel.countDocuments({}),
      bookingModel.countDocuments({}),
      bookingModel.aggregate([
        { $match: { status: "confirmed" } },
        { $group: { _id: null, totalRevenue: { $sum: "$price" } } },
      ]),
      agencyModel.aggregate([
        {
          $lookup: {
            from: "vehicles",
            localField: "_id",
            foreignField: "agency_id",
            as: "vehicles",
          },
        },
        {
          $lookup: {
            from: "bookings",
            localField: "_id",
            foreignField: "agency_id",
            as: "bookings",
          },
        },
        {
          $project: {
            name: 1,
            email: 1,
            vehicleCount: { $size: "$vehicles" },
            bookingCount: { $size: "$bookings" },
            // Calculate total profit for this agency from confirmed bookings
            totalProfit: {
              $sum: {
                $map: {
                  input: {
                    $filter: {
                      input: "$bookings",
                      as: "booking",
                      cond: { $eq: ["$$booking.status", "confirmed"] },
                    },
                  },
                  as: "confirmedBooking",
                  in: "$$confirmedBooking.price",
                },
              },
            },
          },
        },
      ]),
    ])
  );

  if (error) {
    throw new Error("Error fetching superadmin stats");
  }

  const [agencyCount, vehicleCount, bookingCount, revenueResult, agencyBreakdown] = data;
  const totalRevenue = revenueResult[0]?.totalRevenue || 0;

  return {
    overall: {
      agencyCount,
      vehicleCount,
      bookingCount,
      totalRevenue,
    },
    agencies: agencyBreakdown,
  };
}
