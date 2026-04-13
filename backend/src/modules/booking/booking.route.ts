import express, { Router } from "express";
import { bookingHandler } from "./booking.controller.js";
import { validateBookingData } from "./booking.middleware.js";

const bookingRouter: Router = express.Router();

bookingRouter.post("/create", validateBookingData, bookingHandler);

export default bookingRouter;
