import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db";
import authenticationRouter from "./routes/auth.routes";
import notesRouter from "./routes/note.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authenticationRouter);
app.use("/api", notesRouter);

const startServer = async () => {
  await connectDatabase();

  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
};

startServer();
