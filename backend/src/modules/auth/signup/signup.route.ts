import express, { Router } from "express";
import { signupHnadler } from "./signup.controller.js";

const signupRouter: Router = express.Router();

signupRouter.post("/", signupHnadler);

export default signupRouter;
