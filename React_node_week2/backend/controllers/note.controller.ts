import type { Request, Response } from "express";
import mongoose from "mongoose";
import { NoteModel } from "../models/Note.js";

interface AuthenticatedRequest extends Request {
  userIdentifier?: string;
}

export const fetchNotes = async (request: AuthenticatedRequest, response: Response) => {
  if (!request.userIdentifier) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  const ownerObjectId = new mongoose.Types.ObjectId(request.userIdentifier);

  const notesList = await NoteModel.find({ ownerId: ownerObjectId });

  response.json(notesList);
};

export const createNewNote = async (request: AuthenticatedRequest, response: Response) => {
  if (!request.userIdentifier) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  const ownerObjectId = new mongoose.Types.ObjectId(request.userIdentifier);

  const createdNote = await NoteModel.create({
    titleText: request.body.titleText,
    bodyText: request.body.bodyText,
    ownerId: ownerObjectId
  });

  response.json(createdNote);
};

export const modifyNote = async (request: AuthenticatedRequest, response: Response) => {
  if (!request.userIdentifier) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  const updatedNote = await NoteModel.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );

  response.json(updatedNote);
};

export const removeNote = async (request: AuthenticatedRequest, response: Response) => {
  if (!request.userIdentifier) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  await NoteModel.findByIdAndDelete(request.params.id);

  response.json({ success: true });
};
