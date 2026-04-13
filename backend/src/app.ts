import express, { Application, Request, Response } from "express";
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

export const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptoins));

// Serve uploaded files statically
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

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
app.use("/api/agency", agencyRouter);
app.use("/api/vehicle", vehicleRouter);
app.use(
  "/api/booking",
  checkAuth,
  authorize(["customer", "agency", "superadmin"]),
  bookingRouter,
);
import adminPanelRouter from "./modules/admin_panel/admin_panel.routes.js";
import prebookingRouter from "./modules/prebooking/prebooking.routes.js";
import contractRouter from "./modules/contract/contract.routes.js";

app.use("/api/admin", adminPanelRouter);
app.use("/api/prebookings", prebookingRouter);
app.use("/api/contracts", contractRouter);
app.use("/api/user", userRouter);
