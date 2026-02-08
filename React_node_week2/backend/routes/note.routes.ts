import { Router } from "express";
import { authenticateRequest } from "../middleware/auth.middleware.js";
import {
  fetchNotes,
  createNewNote,
  modifyNote,
  removeNote
} from "../controllers/note.controller.js";

const notesRouter = Router();

notesRouter.get("/notes", authenticateRequest, fetchNotes);
notesRouter.post("/notes", authenticateRequest, createNewNote);
notesRouter.put("/notes/:id", authenticateRequest, modifyNote);
notesRouter.delete("/notes/:id", authenticateRequest, removeNote);

export default notesRouter;
