import {Router} from 'express';
const router = Router();

import * as upaCtrl from '../controllers/upa.controller'
import { verifyToken } from '../middlewares';

router.post('/createUpa', verifyToken, upaCtrl.createUPA)

router.post('/enviarMail', verifyToken, upaCtrl.sendEmail)

router.get('/getupa', verifyToken, upaCtrl.getUPAS)

router.get('/:upaId', verifyToken, upaCtrl.getUpaById)

router.get('/upaName/:upaId', verifyToken, upaCtrl.getUpaNameById)

router.get('/userby/:upaId', verifyToken, upaCtrl.getUserByUpa)

router.get('/frameby/:upaId', verifyToken, upaCtrl.getFrameByUpa)

router.put('/:upaId', verifyToken, upaCtrl.editUPA)

router.delete('/:upaId', verifyToken, upaCtrl.deleteUPA)

export default router;