import mongoose from "mongoose";


const noteSchema = new mongoose.Schema({
titleText: String,
bodyText: String,
ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});


export const NoteModel = mongoose.model("Note", noteSchema);