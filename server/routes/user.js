import express from 'express';
import { updateProfilePicture } from '../controllers/authController.js';
import authenticate from '../middlewares/profile.js';

const router = express.Router();

// Apply middleware
router.post('/updateprofilepicture', authenticate, updateProfilePicture);

export default router;
