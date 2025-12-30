import {
  saveVehicleToDB,
  getVehiclesByAgencyDAL,
  updateVehicleDAL,
  deleteVehicleDAL,
} from "../../dal/vehicle.dal.js";
import { tryCatch } from "../../utils/try-catch.js";
import { VehicleData } from "./vehicle.schema.js";

export async function createVehicle(vehicleData: VehicleData) {
  const { data, error } = await tryCatch(saveVehicleToDB(vehicleData));

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getAgencyVehicles(agencyId: string) {
  return await getVehiclesByAgencyDAL(agencyId);
}

export async function updateVehicle(
  vehicleId: string,
  vehicleData: Partial<VehicleData>
) {
  return await updateVehicleDAL(vehicleId, vehicleData);
}

export async function deleteVehicle(vehicleId: string) {
  return await deleteVehicleDAL(vehicleId);
}
