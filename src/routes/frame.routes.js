import {json, Router} from 'express'

const router = Router()
 
import * as frameCtrl from '../controllers/frame.controller'
import { verifyToken } from '../middlewares';

router.post('/createFrame', verifyToken, frameCtrl.createFrame);

router.post('/obtener', verifyToken, frameCtrl.createData);

router.get('/getAll', verifyToken, frameCtrl.getFrame)

router.get('/getLast', verifyToken, frameCtrl.getLast)

router.get('/getLastFrameUpa/:upaId', verifyToken, frameCtrl.getLastFrameByUpa)

router.get('/getAllFrameUpa/:upaId', verifyToken, frameCtrl.getAllFrameByUpa)

router.post('/getReport', frameCtrl.getReport)

router.post('/getFrameVariablesDate', verifyToken, frameCtrl.getFrame_DateVariables)

router.get('/getCRC', verifyToken, frameCtrl.getCRC)

router.get('/:frameId', verifyToken, frameCtrl.getFrameById)

router.put('/:frameId', verifyToken, frameCtrl.updateFrame)

router.delete('/deleteFrame', verifyToken, frameCtrl.deleteFrame)

router.put('/modifyFrame/:id', verifyToken, frameCtrl.updateData);

router.post('/getDataReport', frameCtrl.getDataReport)

export default router;
