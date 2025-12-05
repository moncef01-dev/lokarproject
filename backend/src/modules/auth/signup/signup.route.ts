import express from "express";
import { signupHnadler } from "./signup.controller.js";

const signupRouter = express.Router();

signupRouter.post("/", signupHnadler);

export default signupRouter;
