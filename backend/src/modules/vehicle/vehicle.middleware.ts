import { Request, Response, NextFunction } from "express";
import { vehicleSchema } from "./vehicle.schema.js";

export function validateVehicleData(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const body = req.body as Record<string, unknown>;

  const specsFromFlatFields = {
    fuel: typeof body.fuel === "string" ? body.fuel : undefined,
    transmission:
      typeof body.transmission === "string" ? body.transmission : undefined,
    seats: body.seats,
  };

  const hasFlatSpecs =
    specsFromFlatFields.fuel !== undefined ||
    specsFromFlatFields.transmission !== undefined ||
    specsFromFlatFields.seats !== undefined;

  const normalizedBody = {
    ...body,
    specs:
      typeof body.specs === "object" && body.specs !== null
        ? body.specs
        : hasFlatSpecs
          ? specsFromFlatFields
          : undefined,
  };

  const validationResult = vehicleSchema.safeParse(normalizedBody);

  if (!validationResult.success) {
    res
      .status(400)
      .send("Invalid Vehicle Data " + validationResult.error.message);
    return;
  }

  req.vehicle = validationResult.data;

  next();
}
