import express from "express";
import { refreshAccessTokenHandler } from "./refresh.controller.js";

const refreshRouter = express.Router();

refreshRouter.post("/", refreshAccessTokenHandler);

export default refreshRouter;
