import {Router} from 'express';
const router = Router();

import * as upaCtrl from '../controllers/upa.controller'

router.post('/createUpa', upaCtrl.createUPA)

router.get('/getupa', upaCtrl.getUPAS)

router.get('/:upaId', upaCtrl.getUpaById)

router.get('/userby/:upaId', upaCtrl.getUserByUpa)

router.get('/frameby/:upaId', upaCtrl.getFrameByUpa)

router.put('/:upaId', upaCtrl.editUPA)

router.delete('/:upaId', upaCtrl.deleteUPA)

export default router;