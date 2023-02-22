import {json, Router} from 'express'

const router = Router()
 
import * as frameCtrl from '../controllers/frame.controller'

router.post('/createFrame', frameCtrl.createFrame)

//router.post('/createEst', frameCtrl.createEsta)

router.get('/getAll', frameCtrl.getFrame)

router.get('/getReport', frameCtrl.getReport)

router.get('/:frameId', frameCtrl.getFrameById)

router.put('/:frameId', frameCtrl.updateFrame)

router.delete('/:frameId', frameCtrl.deleteFrame)

export default router;
