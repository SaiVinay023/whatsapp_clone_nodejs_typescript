import { Router } from 'express';
import { signup, login, updateOnlineStatus, getOnlineStatus, healthCheck } from '../controllers/userController';
import { upload } from '../utils/upload';


const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/status/:userId', updateOnlineStatus);
router.get('/status/:userId', getOnlineStatus);
router.get('/health', healthCheck);
//router.post('/send-message', upload.single('file'), sendMessage);


export default router;
