import express, { Application } from "express"
import helmet from "helmet"
import { corsConfig } from "./config/corsConfig"
import cookieParser from "cookie-parser"
import session from "express-session"
import connectDB from "./db/mongoose"
import dotenv from "dotenv"
dotenv.config()

const app: Application = express()
app.use(corsConfig())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(helmet())
server.use(cookieParser())
server.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
}))

app.listen(process.env.PORT, () => {
  console.log("Server is running....")
  connectDB()
})