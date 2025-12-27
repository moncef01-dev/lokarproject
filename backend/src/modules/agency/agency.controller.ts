import { Request, Response } from "express";
import { tryCatch } from "../../utils/try-catch.js";
import { createAgency } from "./agency.service.js";

export async function agencyHandler(req: Request, res: Response) {
  const agencyData = req.agency;
  console.log(req.agency);
  if (!agencyData) {
    res.status(400).send("Invalid Agency Data!");
    return;
  }
  const { data, error } = await tryCatch(createAgency(agencyData));
  if (error) {
    res.status(500).send("Something went wrong");
    return;
  }
  res.status(201).send("Agency created successfully " + data.user_id);
}
