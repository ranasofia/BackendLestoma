import { Router } from 'express'
const router = Router()

import * as authCtrl from '../controllers/auth.controllers'

router.post('/registre', authCtrl.registre)

router.post('/signin', authCtrl.signin)

router.get('/getAll', authCtrl.getUsers)

export default router;