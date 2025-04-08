import express from "express";
import { userRegistration } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/register-user", userRegistration);

export default userRoutes;
