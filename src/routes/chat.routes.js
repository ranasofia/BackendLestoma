import {Router} from 'express';
const router = Router();
import * as chatController from '../controllers/chat.controllers'

router.get('/getId/:userId', chatController.getChatByUserId);


router.post('/createChat', chatController.createChat);

export default router;
