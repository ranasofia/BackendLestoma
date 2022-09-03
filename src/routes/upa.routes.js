import {Router} from 'express';
const router = Router();

import * as upaCtrl from '../controllers/upa.controller'

router.post('/', upaCtrl.createUPA)

router.get('/', upaCtrl.getUPAS)

router.get('/:upaId', upaCtrl.getUPAbyId)

router.put('/:upaId', upaCtrl.editUPA)

router.delete('/:upaId', upaCtrl.deleteUPA)

export default router;