import { Request, Response } from "express";
import {
  saveMessage,
  getConversationHistory,
  saveAiMessage,
} from "../services/chat.service";

import { generateReply } from "../services/llm.service";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message cannot be empty",
      });
    }
    if (message.length > 2000) {
      return res.status(400).json({
        error: "Message is too long. Maximum 2000 characters allowed.",
      });
    }

    const result = await saveMessage(message, sessionId);

    const currentSessionId = result.sessionId;

    const conversation = await getConversationHistory(currentSessionId);

    if (!conversation) {
      return res.status(404).json({
        error: "Conversation not found",
      });
    }

    let reply: string;

    try {
      reply = await generateReply(
        conversation.messages.map((msg) => ({
          sender: msg.sender,
          text: msg.text,
        })),
      );
    } catch (error) {
      console.error("LLM Error:", error);

      return res.status(500).json({
        error: "AI service is currently unavailable",
      });
    }

    await saveAiMessage(currentSessionId, reply);

    res.json({
      success: true,
      sessionId: currentSessionId,
      reply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.sessionId as string;

    const conversation = await getConversationHistory(sessionId);

    res.json(conversation);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
};
