import { Router } from 'express'
const router = Router()

import * as authCtrl from '../controllers/auth.controllers'


/**
 * Registra a un usuario en el sistema.
 * @openapi
 * /auth/registre:
 *   post:
 *     summary: Registrar un nuevo usuario.
 *     tags:
 *       - Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               upaId:
 *                 type: integer
 *               roles:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       '200':
 *         description: El usuario ha sido registrado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       '400':
 *         description: Error de validación de campos o de correo electrónico ya registrado.
 *       '500':
 *         description: Error interno del servidor.
 */
router.post('/registre', authCtrl.registre)

router.post('/registreP', authCtrl.registrePrueba)

/**
 * Inicia sesión de un usuario en el sistema.
 * @openapi
 * /auth/signin:
 *   post:
 *     summary: Iniciar sesión de usuario.
 *     tags:
 *       - Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: El usuario ha iniciado sesión correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       '400':
 *         description: Error de validación de campos o de usuario no encontrado.
 *       '401':
 *         description: Contraseña incorrecta.
 *       '500':
 *         description: Error interno del servidor.
 */
router.post('/signin', authCtrl.signin)

router.get('/getAll', authCtrl.getUsers)

router.get('/getUser/:userId', authCtrl.getUserById)

router.get('/userAuth', authCtrl.getUserLogged)

router.get('/userAuthId', authCtrl.getIdUserLogged)

router.get('/getUsersWithRole2', authCtrl.getUsersWithRole2)

router.put('/updateUser/:id', authCtrl.updateUser)


export default router;