import { Router } from "express";
import { checkAuth } from "../auth/auth.middleware.js";
import { authorize, checkPermission } from "../authZ/authZ.middleware.js";
import { getAgencyStatsController } from "./controllers/agency_admin.controller.js";
import { getSuperAdminStatsController } from "./controllers/super_admin.controller.js";
import { upload } from "../../config/multer.config.js";

const adminPanelRouter: Router = Router();

adminPanelRouter.get("/test", (req, res) => res.send("admin panel is working"));

// Agency Stats Route
adminPanelRouter.get(
  "/agency/stats",
  checkAuth,
  authorize(["agency"]),
  checkPermission("read:report"),
  getAgencyStatsController,
);

// SuperAdmin Stats Route
adminPanelRouter.get(
  "/super/stats",
  checkAuth,
  authorize(["superadmin"]),
  checkPermission("read:report"),
  getSuperAdminStatsController,
);

import {
  createAgencyBySuperAdminHandler,
  updateAgencyHandler,
  deleteAgencyHandler,
} from "../agency/agency.controller.js";

adminPanelRouter.post(
  "/agency/create",
  checkAuth,
  authorize(["superadmin"]),
  upload.single("image"), // Add multer middleware for agency logo upload
  createAgencyBySuperAdminHandler,
);

adminPanelRouter.put(
  "/agency/:id",
  checkAuth,
  authorize(["superadmin"]),
  upload.single("image"),
  updateAgencyHandler,
);

adminPanelRouter.delete(
  "/agency/:id",
  checkAuth,
  authorize(["superadmin"]),
  deleteAgencyHandler,
);

import partnershipRouter from "../partnership/partnership.routes.js";

adminPanelRouter.use("/partnership", partnershipRouter);

export default adminPanelRouter;
