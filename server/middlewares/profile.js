import express from 'express'
import multer from 'multer'
import { updateProfilePicture } from '../controllers/authControllers.js'
import { verifyToken } from '../middlewares/profile.js'

const router = express.Router()


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads') 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) 
  },
})
const upload = multer({ storage })

router.post('/update-profile-picture', verifyToken, upload.single('image'), updateProfilePicture)

export default Router