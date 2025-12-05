import express from "express";
import { loginHnadler } from "./login.controller.js";

const loginRouter = express.Router();

loginRouter.post("/", loginHnadler);

export default loginRouter;
