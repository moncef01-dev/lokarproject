import { Request, Response } from "express";
import { getSuperAdminStats } from "../services/super_admin.service.js";
import { tryCatch } from "../../../utils/try-catch.js";

export async function getSuperAdminStatsController(
  req: Request,
  res: Response
) {
  const { data: stats, error } = await tryCatch(getSuperAdminStats());

  if (error) {
    res.status(500).send("Error fetching superadmin statistics");
    return;
  }

  res.send(stats);
}
