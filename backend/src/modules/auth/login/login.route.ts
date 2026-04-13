import express, { Router } from "express";
import { loginHnadler } from "./login.controller.js";

const loginRouter: Router = express.Router();

loginRouter.post("/", loginHnadler);

export default loginRouter;
