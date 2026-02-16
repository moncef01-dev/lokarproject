import { Router } from "express";
import { createPrebookingController } from "./prebooking.controller.js";

const router = Router();

// Public endpoint for prebooking
router.post("/", createPrebookingController);

export default router;
