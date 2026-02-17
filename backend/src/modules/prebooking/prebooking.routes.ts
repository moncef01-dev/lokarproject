import { Router } from "express";
import { createPrebookingController, getAgencyPrebookingsController, deletePrebookingController, updatePrebookingStatusController } from "./prebooking.controller.js";
import { checkAuth } from "../auth/auth.middleware.js";
import { authorize } from "../authZ/authZ.middleware.js";

import rateLimit from "express-rate-limit";

const prebookingLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per window
    message: "Too many booking requests from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});

const router = Router();

// Public endpoint for prebooking
router.post("/", prebookingLimiter, createPrebookingController);

router.get(
    "/agency",
    checkAuth,
    authorize(["agency"]),
    getAgencyPrebookingsController
);

router.delete(
    "/:id",
    checkAuth,
    authorize(["agency"]),
    deletePrebookingController
);

router.patch(
    "/:id/status",
    checkAuth,
    authorize(["agency"]),
    updatePrebookingStatusController
);

export default router;
