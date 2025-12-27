import express from "express";
import { agencyHandler } from "./agency.controller.js";
import { validateAgencyData } from "./agency.middleware.js";

const agencyRouter = express.Router();

agencyRouter.post("/create", validateAgencyData, agencyHandler);

export default agencyRouter;
