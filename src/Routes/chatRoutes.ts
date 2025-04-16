import express from "express";
import { aiChat } from "../controllers/chatController.js";

const chatRoutes = express.Router();

chatRoutes.post("/chat", aiChat);

export default chatRoutes;
