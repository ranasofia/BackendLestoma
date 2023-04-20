import { Router } from 'express'
const router = Router()

import * as authCtrl from '../controllers/auth.controllers'

router.post('/registre', authCtrl.registre)

router.post('/signin', authCtrl.signin)

router.get('/getAll', authCtrl.getUsers)

router.get('/getUser/:userId', authCtrl.getUserById)

router.get('/userAuth', authCtrl.getUserLogged)

router.get('/userAuthId', authCtrl.getIdUserLogged)

router.get('/getUsersWithRole2', authCtrl.getUsersWithRole2)

export default router;