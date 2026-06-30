import { Router } from "express";
import prisma from "../configs/prisma";

const router = Router();

router.get("/create-conversation", async (req, res) => {
  try {
    const conversation = await prisma.conversation.create({
      data: {},
    });

    res.json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

export default router;