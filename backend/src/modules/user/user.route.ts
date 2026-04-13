import { Router } from "express";
import { checkAuth } from "../auth/auth.middleware.js";
import { getMeController } from "./user.controller.js";

const userRouter: Router = Router();

userRouter.get("/me", checkAuth, getMeController);

export default userRouter;
