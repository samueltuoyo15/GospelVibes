import express, { Application } from "express"
import helmet from "helmet"
import { corsConfig } from "./config/corsConfig"
import { requestLogger, addTimestamp } from "./middlewares/logger"
import songsRoute from "./routes/songsRoute"
import cookieParser from "cookie-parser"
import session from "express-session"
import connectDB from "./db/mongoose"
import dotenv from "dotenv"
dotenv.config()
connectDB()

const app: Application = express()
app.use(corsConfig())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(requestLogger)
app.use(addTimestamp)
app.use("/api", songsRoute)
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
}))

app.listen(process.env.PORT, () => {
  console.log("app is running....")
})