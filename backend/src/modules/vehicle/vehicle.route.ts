import express from "express";
import {
  deleteVehicleHandler,
  getAgencyVehiclesHandler,
  updateVehicleHandler,
  vehicleHandler,
  getAllVehiclesHandler,
} from "./vehicle.controller.js";
import { validateVehicleData } from "./vehicle.middleware.js";
import { checkAuth } from "../auth/auth.middleware.js";
import { authorize } from "../authZ/authZ.middleware.js";
import { upload } from "../../config/multer.config.js";

const vehicleRouter = express.Router();

vehicleRouter.get("/", getAllVehiclesHandler);

vehicleRouter.post(
  "/create",
  checkAuth,
  authorize(["agency"]),
  upload.single("image"), // Add multer middleware for single image upload
  validateVehicleData,
  vehicleHandler,
);

vehicleRouter.get(
  "/agency",
  checkAuth,
  authorize(["agency"]),
  getAgencyVehiclesHandler,
);

vehicleRouter.put(
  "/:id",
  checkAuth,
  authorize(["agency"]),
  upload.single("image"),
  updateVehicleHandler,
);

vehicleRouter.delete(
  "/:id",
  checkAuth,
  authorize(["agency"]),
  deleteVehicleHandler,
);

export default vehicleRouter;
