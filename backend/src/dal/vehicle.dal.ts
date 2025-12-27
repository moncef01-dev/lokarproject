import { vehicleModel } from "../modules/vehicle/vehicle.model.js";
import { VehicleData } from "../modules/vehicle/vehicle.schema.js";
import { tryCatch } from "../utils/try-catch.js";

export async function saveVehicleToDB(vehicleData: VehicleData) {
  const { agency_id, brand, model, year, img_path, availability } = vehicleData;
  const { data, error } = await tryCatch(
    vehicleModel.create({
      agency_id,
      brand,
      model,
      year,
      img_path,
      availability,
    } as any)
  );
  if (error) {
    throw new Error("Something went wrong when creating vehicle");
  }
  return data;
}
