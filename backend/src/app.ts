import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { checkAuth } from "./modules/auth/auth.middleware.js";
import authRouter from "./modules/auth/auth.route.js";
import { authorize } from "./modules/authZ/authZ.middleware.js";
import agencyRouter from "./modules/agency/agency.route.js";
import vehicleRouter from "./modules/vehicle/vehicle.route.js";
import bookingRouter from "./modules/booking/booking.route.js";
import userRouter from "./modules/user/user.route.js";
import { checkPermission } from "./modules/authZ/authZ.middleware.js";
import cors from "cors";
import { corsOptoins } from "./config/cors.config.js";
import { getNodeENV } from "./config/index.js";
import dotenv from "dotenv";
dotenv.config({ debug: false });

export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptoins));
console.log("node env " + getNodeENV());
app.get(
  "/api",
  checkAuth,
  authorize(["customer", "agency", "superadmin"]),
  (req: Request, res: Response) => {
    res.status(200).send("hello world");
  },
);

app.use("/api/auth", authRouter);
app.use("/api/agency", checkAuth, authorize(["agency"]), agencyRouter);
app.use("/api/vehicle", checkAuth, authorize(["agency"]), vehicleRouter);
app.use(
  "/api/booking",
  checkAuth,
  authorize(["customer", "agency", "superadmin"]),
  bookingRouter,
);
import adminPanelRouter from "./modules/admin_panel/admin_panel.routes.js";

app.use("/api/admin", adminPanelRouter);
app.use("/api/user", userRouter);
