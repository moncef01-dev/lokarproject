import { Request, Response, NextFunction } from "express";
import { agencySchema } from "./agency.schema.js";
export function validateAgencyData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validationResult = agencySchema.safeParse(req.body);

  if (!validationResult.success) {
    res
      .status(400)
      .send("Invalid Agency Data " + validationResult.error.message);
    return;
  }

  req.agency = validationResult.data;

  next();
}
