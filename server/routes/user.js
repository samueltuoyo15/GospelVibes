import express from 'express'
import {updateProfilePicture} from '../controllers/authController.js'

const router = express.Router()

router.post('/updateprofilepicture', updateProfilePicture)

export default router