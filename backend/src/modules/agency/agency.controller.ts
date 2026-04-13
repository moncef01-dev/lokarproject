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

  // Handle image upload
  if (req.file) {
    // If file was uploaded, store the path
    agencyData.img_path = `/uploads/${req.file.filename}`;
  }
  // If no file uploaded, img_path from body (URL) will be used (backward compatibility)

  const { data, error } = await tryCatch(createAgency(agencyData));
  if (error) {
    res.status(500).send("Something went wrong");
    return;
  }
  res.status(201).send("Agency created successfully " + (data as any)?.user_id);
}

import { promoteUserToAgency, getAllAgencies } from "./agency.service.js";

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

  // Handle image upload
  let finalImgPath = img_path;
  if (req.file) {
    finalImgPath = `/uploads/${req.file.filename}`;
  }

  const { data, error } = await tryCatch(
    promoteUserToAgency(email, { email, name, address, phone, img_path: finalImgPath }),
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

export async function getAllAgenciesHandler(req: Request, res: Response) {
  const { data: agencies, error } = await tryCatch(getAllAgencies());

  if (error) {
    res.status(500).send("Error fetching all agencies");
    return;
  }

  res.send(agencies);
}

import { updateAgency, deleteAgency } from "./agency.service.js";

export async function updateAgencyHandler(req: Request, res: Response) {
  const { id } = req.params;
  const agencyData = req.body;

  if (!id) {
    res.status(400).send("Missing agency ID");
    return;
  }

  // Handle image upload if a new file was provided
  if (req.file) {
    agencyData.img_path = `/uploads/${req.file.filename}`;
  }

  const { data, error } = await tryCatch(updateAgency(id as string, agencyData));

  if (error) {
    res.status(400).send(error.message || "Failed to update agency");
    return;
  }

  res.status(200).send(data);
}

export async function deleteAgencyHandler(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    res.status(400).send("Missing agency ID");
    return;
  }

  const { data, error } = await tryCatch(deleteAgency(id as string));

  if (error) {
    res.status(400).send(error.message || "Failed to delete agency");
    return;
  }

  res.status(200).send({ message: "Agency deleted successfully", id });
}
