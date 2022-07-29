import {json, Router} from 'express'

const router = Router()
 
import * as frameCtrl from '../controllers/frame.controller'

router.post('/', frameCtrl.createFrame)

router.get('/', frameCtrl.getFrame)

router.get('/:frameId', frameCtrl.getFrameById)

router.put('/:frameId', frameCtrl.updateFrame)

router.delete('/:frameId', frameCtrl.deleteFrame)

export default router;
