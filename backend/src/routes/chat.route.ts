import { Router } from "express";
import {
  sendMessage,
  getHistory,
} from "../controllers/chat.controller";

const router = Router();

router.post("/message", sendMessage);

router.get("/history/:sessionId", getHistory);

export default router;