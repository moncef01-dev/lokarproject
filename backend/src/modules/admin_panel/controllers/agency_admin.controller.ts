import { Request, Response } from "express";
import { findAgencyByUserId } from "../../../dal/agency.dal.js";
import { getAgencyStats } from "../services/agency_admin.service.js";
import { tryCatch } from "../../../utils/try-catch.js";

export async function getAgencyStatsController(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).send("Unauthorized");
    return;
  }

  const { data: agency, error: agencyError } = await tryCatch(
    findAgencyByUserId(userId)
  );

  if (agencyError || !agency) {
    console.warn("Agency document not found in DB for user:", userId);
    res.status(200).send({
      vehicleCount: 0,
      bookingCount: 0,
      totalProfit: 0,
    });
    return;
  }

  const { data: stats, error: statsError } = await tryCatch(
    getAgencyStats(agency._id.toString())
  );

  if (statsError) {
    res.status(500).send("Error fetching agency statistics");
    return;
  }

  res.send(stats);
}
