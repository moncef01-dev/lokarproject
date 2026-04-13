import express, { Router } from "express";
import signupRouter from "./signup/signup.route.js";
import loginRouter from "./login/login.route.js";
import refreshRouter from "./refresh/refresh.route.js";

const authRouter: Router = express.Router();

authRouter.use("/signup", signupRouter);
authRouter.use("/login", loginRouter);
authRouter.use("/refresh", refreshRouter);

authRouter.post("/logout", (req, res) => {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
});

export default authRouter;

