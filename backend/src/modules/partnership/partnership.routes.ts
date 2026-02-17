import { Router } from "express";
import { checkAuth } from "../auth/auth.middleware.js";
import { authorize } from "../authZ/authZ.middleware.js";
import {
    applyForPartnershipHandler,
    getPartnershipRequestsHandler,
    approvePartnershipHandler,
    denyPartnershipHandler,
} from "./partnership.controller.js";

const partnershipRouter = Router();

// Public endpoint
partnershipRouter.post("/apply", applyForPartnershipHandler);

// Admin endpoints
partnershipRouter.get(
    "/requests",
    checkAuth,
    authorize(["superadmin"]),
    getPartnershipRequestsHandler
);

partnershipRouter.post(
    "/approve/:id",
    checkAuth,
    authorize(["superadmin"]),
    approvePartnershipHandler
);

partnershipRouter.post(
    "/deny/:id",
    checkAuth,
    authorize(["superadmin"]),
    denyPartnershipHandler
);

export default partnershipRouter;
