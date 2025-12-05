import express from "express";
import signupRouter from "./signup/signup.route.js";
import loginRouter from "./login/login.route.js";
import refreshRouter from "./refresh/refresh.route.js";

const authRouter = express.Router();

authRouter.use("/signup", signupRouter);
authRouter.use("/login", loginRouter);
authRouter.use("/refresh", refreshRouter);

export default authRouter;
