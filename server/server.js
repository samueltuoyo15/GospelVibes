import express from 'express'
import dotenv from 'dotenv'
import auth from './routes/auth.js'
import updateprofilepicture from './routes/user.js'
import axios from 'axios'
import mongoose from 'mongoose'
import cors from 'cors'
import songs from './routes/songs.js'
import connectDb from './db/mongoose.js'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

connectDb()

app.use('/api/auth', auth)
app.use('/api/users', updateprofilepicture)
app.use('/api/songs', songs);


app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:' + process.env.PORT)
})
