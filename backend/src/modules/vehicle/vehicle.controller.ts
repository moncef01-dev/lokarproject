import { Request, Response } from "express";
import { tryCatch } from "../../utils/try-catch.js";
import {
  createVehicle,
  deleteVehicle,
  getAgencyVehicles,
  updateVehicle,
  getAllVehicles,
} from "./vehicle.service.js";
import { findAgencyByUserId } from "../../dal/agency.dal.js";

export async function vehicleHandler(req: Request, res: Response) {
  const vehicleData = req.vehicle;
  const userId = req.user?.id;

  if (!vehicleData) {
    res.status(400).send("Invalid Vehicle Data!");
    return;
  }

  if (!userId) {
    res.status(401).send("Unauthorized");
    return;
  }

  // Find the agency associated with the user
  const { data: agency, error: agencyError } = await tryCatch(
    findAgencyByUserId(userId),
  );

  if (agencyError || !agency) {
    res
      .status(404)
      .send(
        "Agency profile not found. Please complete your agency profile first.",
      );
    return;
  }

  // Assign the correct Agency ID
  vehicleData.agency_id = agency._id.toString();

  // Handle image upload
  if (req.file) {
    // If file was uploaded, store the path
    vehicleData.img_path = `/uploads/${req.file.filename}`;
  }
  // If no file uploaded, img_path from body (URL) will be used (backward compatibility)

  const { data, error } = await tryCatch(createVehicle(vehicleData));
  if (error) {
    res.status(500).send("Something went wrong");
    return;
  }
  res.status(201).send("Vehicle created successfully " + (data as any)._id);
}

export async function getAgencyVehiclesHandler(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).send("Unauthorized");
    return;
  }

  // Resolve Agency ID from User ID
  const { data: agency, error: agencyError } = await tryCatch(
    findAgencyByUserId(userId),
  );

  if (agencyError || !agency) {
    // If no agency profile found, return empty list (or could be 404, but empty list is safer for UI)
    res.send([]);
    return;
  }

  const { data: vehicles, error } = await tryCatch(
    getAgencyVehicles(agency._id.toString()),
  );
  if (error) {
    res.status(500).send("Error fetching vehicles");
    return;
  }
  res.send(vehicles);
}

export async function getAllVehiclesHandler(req: Request, res: Response) {
  const { data: vehicles, error } = await tryCatch(getAllVehicles());

  if (error) {
    res.status(500).send("Error fetching all vehicles");
    return;
  }

  res.send(vehicles);
}

export async function updateVehicleHandler(req: Request, res: Response) {
  const { id } = req.params;
  const vehicleData = req.body;

  // Handle image upload if a new file was provided
  if (req.file) {
    vehicleData.img_path = `/uploads/${req.file.filename}`;
  }

  const { data, error } = await tryCatch(
    updateVehicle(id as string, vehicleData),
  );
  if (error) {
    res.status(500).send("Error updating vehicle");
    return;
  }
  res.send(data);
}

export async function deleteVehicleHandler(req: Request, res: Response) {
  const { id } = req.params;
  const { error } = await tryCatch(deleteVehicle(id as string));
  if (error) {
    res.status(500).send("Error deleting vehicle");
    return;
  }
  res.send({ message: "Vehicle deleted successfully" });
}
