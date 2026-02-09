import React from 'react'

const NoteCard = ({ note, onUpdate, onDelete }) => {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div>
        <button onClick={() => onUpdate(note)}>Edit</button>
        <button onClick={() => onDelete(note._id)}>Delete</button>
      </div>
    </div>
  )
}

export default NoteCard
