import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Routes
app.use("/api/v1/user", userRoutes);
// Error handling middleware
app.use(errorHandler);
