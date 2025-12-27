import express from "express";
import { bookingHandler } from "./booking.controller.js";
import { validateBookingData } from "./booking.middleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/create", validateBookingData, bookingHandler);

export default bookingRouter;
