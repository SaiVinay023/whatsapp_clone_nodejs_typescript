import { Router } from 'express';
import { signup, login, updateOnlineStatus, getOnlineStatus, sendMessage, healthCheck } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' }); // simple file storage

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/health', healthCheck);

// Protected routes
router.patch('/user/:userId/status', authenticateToken, updateOnlineStatus);
router.get('/user/:userId/status', authenticateToken, getOnlineStatus);
router.post('/send-message', authenticateToken, upload.single('file'), sendMessage);

export default router;
