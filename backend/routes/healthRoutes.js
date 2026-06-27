import express from "express";
import { getHealthData, updateHealthData } from "../controllers/healthController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", protect, getHealthData);
router.put("/", protect, updateHealthData);

export default router;
