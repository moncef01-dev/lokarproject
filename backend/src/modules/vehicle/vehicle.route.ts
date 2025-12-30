import express from "express";
import {
  deleteVehicleHandler,
  getAgencyVehiclesHandler,
  updateVehicleHandler,
  vehicleHandler,
} from "./vehicle.controller.js";
import { validateVehicleData } from "./vehicle.middleware.js";
import { checkAuth } from "../auth/auth.middleware.js";
import { authorize } from "../authZ/authZ.middleware.js";

const vehicleRouter = express.Router();

vehicleRouter.post(
  "/create",
  checkAuth,
  authorize(["agency"]),
  validateVehicleData,
  vehicleHandler
);

vehicleRouter.get(
  "/agency",
  checkAuth,
  authorize(["agency"]),
  getAgencyVehiclesHandler
);

vehicleRouter.put(
  "/:id",
  checkAuth,
  authorize(["agency"]),
  updateVehicleHandler
);

vehicleRouter.delete(
  "/:id",
  checkAuth,
  authorize(["agency"]),
  deleteVehicleHandler
);

export default vehicleRouter;
