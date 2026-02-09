const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const notesRoutes = require('./routes/notes')
const errorMiddleware = require('./middleware/errorMiddleware')
const db = mongoose.connect("mongodb://localhost:27017/notesapp").then(() => {
  console.log("Connected to db");
})

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', authRoutes)
app.use('/api/notes', notesRoutes)
app.use(errorMiddleware)


app.listen(5000, () => {
  console.log("server started");
})
