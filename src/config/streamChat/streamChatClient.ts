import dotenv from "dotenv";
import { StreamChat } from "stream-chat";

dotenv.config();

const apiKey = process.env.STREAM_API_KEY || "";
const apiSecret = process.env.STREAM_API_SECRET || "";

const streamChatClient = StreamChat.getInstance(apiKey, apiSecret);

export default streamChatClient;
