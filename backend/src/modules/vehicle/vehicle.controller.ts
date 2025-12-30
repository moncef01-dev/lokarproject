import { Request, Response } from "express";
import { tryCatch } from "../../utils/try-catch.js";
import {
  createVehicle,
  deleteVehicle,
  getAgencyVehicles,
  updateVehicle,
} from "./vehicle.service.js";

export async function vehicleHandler(req: Request, res: Response) {
  const vehicleData = req.vehicle;
  if (!vehicleData) {
    res.status(400).send("Invalid Vehicle Data!");
    return;
  }
  const { data, error } = await tryCatch(createVehicle(vehicleData));
  if (error) {
    res.status(500).send("Something went wrong");
    return;
  }
  res.status(201).send("Vehicle created successfully " + (data as any)._id);
}

export async function getAgencyVehiclesHandler(req: Request, res: Response) {
  const agencyId = req.user?.id;
  if (!agencyId) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { data: vehicles, error } = await tryCatch(getAgencyVehicles(agencyId));
  if (error) {
    res.status(500).send("Error fetching vehicles");
    return;
  }
  res.send(vehicles);
}

export async function updateVehicleHandler(req: Request, res: Response) {
  const { id } = req.params;
  const vehicleData = req.body;
  const { data, error } = await tryCatch(
    updateVehicle(id as string, vehicleData)
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
