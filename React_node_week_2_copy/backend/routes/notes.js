const express = require('express')
const router = express.Router()
const Note = require('../models/Note')
const authMiddleware = require('../middleware/authMiddleware')

router.use(authMiddleware)

router.get('/', async (req, res) => {
  const notes = await Note.find({ user: req.user._id })
  res.json(notes)
})

router.post('/', async (req, res) => {
  const { title, content } = req.body
  const note = await Note.create({ user: req.user._id, title, content })
  res.json(note)
})

router.put('/:id', async (req, res) => {
  const { title, content } = req.body
  const note = await Note.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { title, content }, { new: true })
  res.json(note)
})

router.delete('/:id', async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id })
  res.json({ message: 'Deleted' })
})

module.exports = router
