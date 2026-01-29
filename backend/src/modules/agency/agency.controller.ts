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

  if (!req.user?.id) {
    res.status(401).send("Unauthorized");
    return;
  }

  // Force associating the agency with the logged-in user
  agencyData.user_id = req.user.id;
  const { data, error } = await tryCatch(createAgency(agencyData));
  if (error) {
    res.status(500).send("Something went wrong");
    return;
  }
  res.status(201).send("Agency created successfully " + data?.user_id);
}

import { promoteUserToAgency } from "./agency.service.js";

export async function createAgencyBySuperAdminHandler(
  req: Request,
  res: Response,
) {
  const { email, name, address, phone, img_path } = req.body;

  if (!email || !name || !address || !phone) {
    res
      .status(400)
      .send("Missing required fields: email, name, address, phone");
    return;
  }

  const { data, error } = await tryCatch(
    promoteUserToAgency(email, { email, name, address, phone, img_path }),
  );

  if (error) {
    res.status(400).send(error.message || "Failed to promote user to agency");
    return;
  }

  res.status(201).send({
    message: "Agency created and user promoted successfully",
    agency: data,
  });
}
