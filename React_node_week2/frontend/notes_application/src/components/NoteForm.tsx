import { useState } from "react";

type NoteFormProps = {
  onSaveNote: (titleText: string, bodyText: string) => void;
  existingTitle?: string;
  existingBody?: string;
};

const NoteForm = ({ onSaveNote, existingTitle = "", existingBody = "" }: NoteFormProps) => {
  const [titleText, setTitleText] = useState(existingTitle);
  const [bodyText, setBodyText] = useState(existingBody);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSaveNote(titleText, bodyText);
    setTitleText("");
    setBodyText("");
  };

  return (
    <form className="note-form" onSubmit={submitHandler}>
      <input
        value={titleText}
        onChange={(event) => setTitleText(event.target.value)}
        placeholder="Note title"
      />

      <textarea
        value={bodyText}
        onChange={(event) => setBodyText(event.target.value)}
        placeholder="Note content"
      />

      <button type="submit">Save Note</button>
    </form>
  );
};

export default NoteForm;
