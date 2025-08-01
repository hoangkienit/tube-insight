import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import YoutubeController from "../controllers/youtube.controller";

const router = Router();

router.post("/analyze", asyncHandler(YoutubeController.Analyze));

export default router;