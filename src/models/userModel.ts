import streamChatClient from "../config/streamChat/streamChatClient.js";

interface User {
  name: string;
  email: string;
}

export const userRegistrationService = async (user: User) => {
  const { name, email } = user;
  try {
    const userId = email.replace(/[^a-zA-Z0-9_-]/g, "_");
    const userResponse = await streamChatClient.queryUsers({
      id: { $eq: userId },
    });
    if (!userResponse.users.length) {
      const res = await streamChatClient.upsertUser({
        id: userId,
        name,
        email,
        role: "user",
      });
      return res;
    }
    return userResponse.users[0];
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("User registration failed");
  }
};
