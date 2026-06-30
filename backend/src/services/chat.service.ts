import prisma from "../configs/prisma";

export const saveMessage = async (
  message: string,
  sessionId?: string
) => {
  if (sessionId) {
    const savedMessage = await prisma.message.create({
      data: {
        conversationId: sessionId,
        sender: "user",
        text: message,
      },
    });

    return {
      sessionId,
      savedMessage,
    };
  }

  const conversation = await prisma.conversation.create({
    data: {
      messages: {
        create: {
          sender: "user",
          text: message,
        },
      },
    },
    include: {
      messages: true,
    },
  });

  return {
    sessionId: conversation.id,
    conversation,
  };
};
export const getConversationHistory = async (
  sessionId: string
) => {
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return conversation;
};
export const saveAiMessage = async (
  sessionId: string,
  reply: string
) => {
  return prisma.message.create({
    data: {
      conversationId: sessionId,
      sender: "ai",
      text: reply,
    },
  });
};