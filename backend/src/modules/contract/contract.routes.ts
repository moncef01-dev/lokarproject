import express, { Router } from "express";
import { checkAuth } from "../auth/auth.middleware.js";
import { authorize } from "../authZ/authZ.middleware.js";
import { generateContractController, downloadContractController } from "./contract.controller.js";

const contractRouter: Router = express.Router();

// Generate Contract
contractRouter.post(
    "/generate",
    checkAuth,
    authorize(["agency"]),
    generateContractController
);

// Download Contract
contractRouter.get(
    "/:id/download",
    checkAuth,
    authorize(["agency"]),
    downloadContractController
);

export default contractRouter;
