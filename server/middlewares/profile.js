import express from 'express';
import { updateProfilePicture } from '../controllers/authController';
import authenticate from '../middleware/authenticate';

const router = express.Router();

// Make sure the authenticate middleware is applied first
router.put('/updateProfilePicture', authenticate, updateProfilePicture);

export default router;
