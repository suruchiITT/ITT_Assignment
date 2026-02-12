import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NoteForm from '../components/NoteForm'
import NoteCard from '../components/NoteCard'
import ErrorMessage from '../components/ErrorMessage'

const Dashboard = () => {
  const [notes, setNotes] = useState([])
  const [error, setError] = useState('')
  const [editingNote, setEditingNote] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/notes', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setNotes(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notes')
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const addNote = async (note) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/notes', note, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setNotes((prev) => [...prev, data])
      setEditingNote(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add note')
    }
  }

  const updateNote = async (note) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/notes/${note._id}`,
        note,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNotes((prev) => prev.map((n) => (n._id === note._id ? data : n)))
      setEditingNote(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update note')
    }
  }

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setNotes((prev) => prev.filter((note) => note._id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note')
    }
  }

  const handleEditClick = (note) => {
    setEditingNote(note)
  }


  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <button
        onClick={handleLogout}
        className="logout-btn"
      >
        Logout
      </button>

      <h2>Your Notes</h2>

      <NoteForm
        onSave={editingNote ? updateNote : addNote}
        note={editingNote}
        key={editingNote ? editingNote._id : 'new'}
      />

      <ErrorMessage message={error} />

      <div className="notes-grid" >
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onUpdate={handleEditClick}
            onDelete={deleteNote}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
