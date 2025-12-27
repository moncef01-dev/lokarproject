import { Request, Response, NextFunction } from "express";
import { vehicleSchema } from "./vehicle.schema.js";

export function validateVehicleData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validationResult = vehicleSchema.safeParse(req.body);

  if (!validationResult.success) {
    res
      .status(400)
      .send("Invalid Vehicle Data " + validationResult.error.message);
    return;
  }

  req.vehicle = validationResult.data;

  next();
}
