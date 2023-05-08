import {Router} from 'express';
const router = Router();
import * as chatController from '../controllers/chat.controllers'
import { verifyToken } from '../middlewares';

router.get('/getId/:userId', verifyToken, chatController.getChatByUserId);


router.post('/createChat', verifyToken, chatController.createChat);

export default router;
