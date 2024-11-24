import express from 'express'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'
import auth from './routes/auth.js'
import axios from 'axios'
import mongoose from 'mongoose'
import songs from './routes/songs.js'
import connectDb from './db/mongoose.js'
dotenv.config()

const app = express()
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

connectDb()

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
app.use('/api/auth', auth)
app.use('/api/songs', songs);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
})

app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:' + process.env.PORT)
})
