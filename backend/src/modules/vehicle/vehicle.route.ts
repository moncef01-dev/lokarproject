import express from "express";
import { vehicleHandler } from "./vehicle.controller.js";
import { validateVehicleData } from "./vehicle.middleware.js";

const vehicleRouter = express.Router();

vehicleRouter.post("/create", validateVehicleData, vehicleHandler);

export default vehicleRouter;
