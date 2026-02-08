import { useEffect, useState } from "react";
import { fetchNotes, createNote, deleteNote } from "../api/api";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";

type NoteType = {
  _id: string;
  titleText: string;
  bodyText: string;
};

const Dashboard = () => {
  const [notesList, setNotesList] = useState<NoteType[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const data = await fetchNotes();
    setNotesList(data);
  };

  const saveNoteHandler = async (titleText: string, bodyText: string) => {
    await createNote(titleText, bodyText);
    loadNotes();
  };

  const deleteNoteHandler = async (id: string) => {
    await deleteNote(id);
    loadNotes();
  };

  return (
    <div className="dashboard-container">
      <h2>Your Notes</h2>

      <NoteForm onSaveNote={saveNoteHandler} />

      <div className="notes-grid">
        {notesList.map((note) => (
          <NoteCard
            key={note._id}
            noteId={note._id}
            titleText={note.titleText}
            bodyText={note.bodyText}
            onEditNote={() => {}}
            onDeleteNote={deleteNoteHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
