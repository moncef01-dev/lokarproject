import express from "express";
import { agencyHandler, getAllAgenciesHandler } from "./agency.controller.js";
import { validateAgencyData } from "./agency.middleware.js";

import { checkAuth } from "../auth/auth.middleware.js";
import { authorize } from "../authZ/authZ.middleware.js";
import { upload } from "../../config/multer.config.js";

const agencyRouter = express.Router();

agencyRouter.get("/", getAllAgenciesHandler);

agencyRouter.post(
  "/create",
  checkAuth,
  authorize(["agency"]),
  upload.single("image"), // Add multer middleware for agency logo upload
  validateAgencyData,
  agencyHandler,
);

export default agencyRouter;
