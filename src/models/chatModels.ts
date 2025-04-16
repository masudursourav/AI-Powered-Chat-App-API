import { console } from "inspector";
import { ai } from "../googleAi/googleAi.js";
import streamChatClient from "../streamChat/streamChatClient.js";

interface ChatServiceParams {
  userId: string;
  message: string;
}

export const chatService = async (
  userId: ChatServiceParams["userId"],
  message: ChatServiceParams["message"]
) => {
  try {
    const userResponse = await streamChatClient.queryUsers({
      id: userId,
    });
    if (!userResponse.users.length) {
      throw new Error("User not found");
    }
    const chatResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
    });
    if (!chatResponse) {
      throw new Error("Chat response not found");
    }
    const channel = streamChatClient.channel("messaging", `chat-${userId}`, {
      name: "Chat with AI",
      created_by_id: "Chat-bot",
    });
    await channel.create();
    await channel.sendMessage({
      text: chatResponse.text,
      user_id: "Chat-bot",
    });
    return chatResponse.text;
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw new Error("Chat message sending failed");
  }
};
