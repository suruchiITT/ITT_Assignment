import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";

dotenv.config();

const app = express();

connectDB();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
