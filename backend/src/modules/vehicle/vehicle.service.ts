import { saveVehicleToDB } from "../../dal/vehicle.dal.js";
import { tryCatch } from "../../utils/try-catch.js";
import { VehicleData } from "./vehicle.schema.js";

export async function createVehicle(vehicleData: VehicleData) {
  const { data, error } = await tryCatch(saveVehicleToDB(vehicleData));

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
