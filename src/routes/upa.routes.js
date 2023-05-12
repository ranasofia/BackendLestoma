import {Router} from 'express';
const router = Router();

import * as upaCtrl from '../controllers/upa.controller'
import { verifyToken } from '../middlewares';

/**
 * @swagger
 * /upa/createUpa:
 *   post:
 *     summary: Crea una nueva UPA
 *     description: Crea una nueva UPA con un nombre y una ubicación dada
 *     tags:
 *       - UPA
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de acceso (JWT)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la UPA
 *               location:
 *                 type: string
 *                 description: Ubicación de la UPA
 *     responses:
 *       201:
 *         description: UPA creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *                 __v:
 *                   type: number
 *       400:
 *         description: Datos de entrada incorrectos
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 *       500:
 *         description: Error al crear la UPA
 */
router.post('/createUpa', upaCtrl.createUPA)

/**
 * @swagger
 * /upa/enviarMail:
 *   post:
 *     summary: Envia un email a un usuario
 *     description: Envía un email a un usuario con un mensaje dado
 *     tags:
 *       - Email
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de acceso (JWT)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario a quien se le enviará el mensaje
 *               message:
 *                 type: string
 *                 description: Mensaje a enviar
 *     responses:
 *       200:
 *         description: Correo enviado con éxito o el correo no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *       400:
 *         description: Error al enviar el correo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 */
router.post('/enviarMail', verifyToken, upaCtrl.sendEmail)

/**
 * @swagger
 * /upa/getupa:
 *   get:
 *     summary: Obtiene todas las UPAS
 *     description: Obtiene todas las Unidades de Producción Agricolas (UPAS) existentes
 *     tags:
 *       - UPA
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de acceso (JWT)
 *     responses:
 *       200:
 *         description: Recuperación exitosa de las UPAS
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   location:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                   __v:
 *                     type: number
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/getupa', verifyToken, upaCtrl.getUPAS)

/**
 * @swagger
 * /upa/{upaId}:
 *   get:
 *     summary: Obtiene una UPA por ID
 *     description: Obtiene una Unidad de Producción Acuícola (UPA) existente por su ID
 *     tags:
 *       - UPA
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de acceso (JWT)
 *       - in: path
 *         name: upaId
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la UPA
 *     responses:
 *       200:
 *         description: Recuperación exitosa de la UPA
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 location:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                 __v:
 *                   type: number
 *       404:
 *         description: No se encontró ninguna UPA con el ID proporcionado
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:upaId', verifyToken, upaCtrl.getUpaById)

router.get('/upaName/:upaId', verifyToken, upaCtrl.getUpaNameById)

/**
 * @swagger
 * /upa/userby/{upaId}:
 *   get:
 *     summary: Obtiene usuarios por UPA ID
 *     description: Obtiene todos los usuarios vinculados a una Unidad de Producción Acuícola (UPA) por el ID de la UPA
 *     tags:
 *       - UPA
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de acceso (JWT)
 *       - in: path
 *         name: upaId
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la UPA
 *     responses:
 *       200:
 *         description: Recuperación exitosa de los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   roles:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                   __v:
 *                     type: number
 *       404:
 *         description: No se encontró la UPA con el ID proporcionado
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/userby/:upaId', upaCtrl.getUserByUpa)


router.get('/frameby/:upaId', verifyToken, upaCtrl.getFrameByUpa)

router.get('/emailby/:upaId', upaCtrl.getUsersEmailsByUpa)

router.put('/:upaId', verifyToken, upaCtrl.editUPA)

router.delete('/:upaId', verifyToken, upaCtrl.deleteUPA)

export default router;