import {json, Router} from 'express'

const router = Router()
 
import * as frameCtrl from '../controllers/frame.controller'

router.post('/createFrame', frameCtrl.createFrame);

router.post('/obtener', frameCtrl.createData);

router.get('/getAll', frameCtrl.getFrame)

router.get('/getLast', frameCtrl.getLast)

router.post('/getReport', frameCtrl.getReport)

router.post('/getFrameVariablesDate', frameCtrl.getFrame_DateVariables)

router.get('/getCRC', frameCtrl.getCRC)

router.get('/:frameId', frameCtrl.getFrameById)

router.put('/:frameId', frameCtrl.updateFrame)

router.delete('/deleteFrame', frameCtrl.deleteFrame)

router.put('/modifyFrame/:id', frameCtrl.updateData);

export default router;
