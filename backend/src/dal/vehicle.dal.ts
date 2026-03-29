import { vehicleModel } from "../modules/vehicle/vehicle.model.js";
import { VehicleData } from "../modules/vehicle/vehicle.schema.js";
import { tryCatch } from "../utils/try-catch.js";

export async function saveVehicleToDB(vehicleData: VehicleData) {
  const {
    agency_id,
    brand,
    model,
    year,
    price,
    specs,
    img_path,
    availability,
  } = vehicleData;
  const { data, error } = await tryCatch(
    vehicleModel.create({
      agency_id,
      brand,
      model,
      year,
      price,
      specs,
      img_path,
      availability,
    } as any),
  );
  if (error) {
    throw new Error("Something went wrong when creating vehicle");
  }
  return data;
}

export async function getVehiclesByAgencyDAL(agencyId: string) {
  const { data, error } = await tryCatch(
    vehicleModel.find({ agency_id: agencyId }),
  );
  if (error) {
    throw new Error("Error fetching vehicles for agency");
  }
  return data;
}

export async function updateVehicleDAL(
  vehicleId: string,
  vehicleData: Partial<VehicleData>,
) {
  const { data, error } = await tryCatch(
    vehicleModel.findByIdAndUpdate(vehicleId, vehicleData, { new: true }),
  );
  if (error) {
    throw new Error("Error updating vehicle");
  }
  return data;
}

export async function deleteVehicleDAL(vehicleId: string) {
  const { error } = await tryCatch(vehicleModel.findByIdAndDelete(vehicleId));
  if (error) {
    throw new Error("Error deleting vehicle");
  }
  return true;
}
export async function getAllVehiclesDAL() {
  const { data, error } = await tryCatch(
    vehicleModel.find({}).populate("agency_id"),
  );
  if (error) {
    throw new Error("Error fetching all vehicles");
  }
  return data;
}
