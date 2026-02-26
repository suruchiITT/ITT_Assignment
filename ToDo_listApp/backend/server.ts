import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import activityRoutes from "./routes/activityRoutes";

import { errorMiddleware } from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();

app.use(express.json());
connectDB();
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", activityRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
