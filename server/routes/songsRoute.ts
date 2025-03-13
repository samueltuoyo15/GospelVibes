import { Router } from "express"
import { fetchSongs } from "../controllers/fetchSongs"

const router = Router()

router.get("/songs", fetchSongs)

export default router 