import express, { Router } from "express";
import { refreshAccessTokenHandler } from "./refresh.controller.js";

const refreshRouter: Router = express.Router();

refreshRouter.post("/", refreshAccessTokenHandler);

export default refreshRouter;
