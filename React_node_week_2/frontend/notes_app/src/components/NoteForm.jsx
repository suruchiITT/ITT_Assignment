import React, { useState, useEffect } from 'react'

const NoteForm = ({ onSave, note }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    } else {
      setTitle('')
      setContent('')
    }
  }, [note])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !content) return
    const noteData = note ? { ...note, title, content } : { title, content }
    onSave(noteData)
    setTitle('')
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit" className={note ? 'update' : 'save'}>
        {note ? 'Update' : 'Save'}
      </button>
    </form>
  )
}

export default NoteForm
