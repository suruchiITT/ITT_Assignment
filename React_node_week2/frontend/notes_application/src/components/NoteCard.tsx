type NoteCardProps = {
  noteId: string;
  titleText: string;
  bodyText: string;
  onEditNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
};

const NoteCard = ({
  noteId,
  titleText,
  bodyText,
  onEditNote,
  onDeleteNote
}: NoteCardProps) => {
  return (
    <div className="note-card">
      <h3>{titleText}</h3>
      <p>{bodyText}</p>

      <div className="note-actions">
        <button onClick={() => onEditNote(noteId)}>Edit</button>
        <button onClick={() => onDeleteNote(noteId)}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
