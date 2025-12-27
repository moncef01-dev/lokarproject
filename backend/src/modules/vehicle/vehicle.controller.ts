import { Request, Response } from "express";
import { tryCatch } from "../../utils/try-catch.js";
import { createVehicle } from "./vehicle.service.js";

export async function vehicleHandler(req: Request, res: Response) {
  const vehicleData = req.vehicle;
  console.log(req.vehicle);
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
