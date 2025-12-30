import { Router } from "express";
import { checkAuth } from "../auth/auth.middleware.js";
import { authorize, checkPermission } from "../authZ/authZ.middleware.js";
import { getAgencyStatsController } from "./controllers/agency_admin.controller.js";
import { getSuperAdminStatsController } from "./controllers/super_admin.controller.js";

const adminPanelRouter = Router();

adminPanelRouter.get("/test", (req, res) => res.send("admin panel is working"));

// Agency Stats Route
adminPanelRouter.get(
  "/agency/stats",
  checkAuth,
  authorize(["agency"]),
  checkPermission("read:report"),
  getAgencyStatsController
);

// SuperAdmin Stats Route
adminPanelRouter.get(
  "/super/stats",
  checkAuth,
  authorize(["superadmin"]),
  checkPermission("read:report"),
  getSuperAdminStatsController
);

export default adminPanelRouter;
