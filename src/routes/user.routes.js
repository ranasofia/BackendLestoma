import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { verifyToken } from '../middlewares';
/* import { authJwt, verifySignup } from "../middlewares"; */

/* router.post(
  "/",
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkDuplicateUsernameOrEmail,
  ],
  usersCtrl.createUser
); */


/**
 * @swagger
 * /users/getAll:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Recupera una lista de todos los usuarios con sus roles asociados.
 *     tags:
 *       - Usuarios
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
 *                         id_rol:
 *                           type: string
 *                         name_rol:
 *                           type: string
 *                   __v:
 *                     type: number
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/getAll", verifyToken, usersCtrl.getUsers);

/**
 * @swagger
 * /users/getUser/{userId}:
 *   get:
 *     summary: Obtiene un usuario específico por ID
 *     description: Recupera la información de un usuario específico utilizando su ID.
 *     tags:
 *       - Usuarios
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
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Recuperación exitosa del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userResponse:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     lastname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     upa:
 *                       type: string
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/getUser/:userId", verifyToken, usersCtrl.getUserById);

/**
 * @swagger
 * /users/resetPass:
 *   get:
 *     summary: Restablece la contraseña del usuario
 *     description: Restablece la contraseña de un usuario utilizando un token que se proporciona en la URL.
 *     tags:
 *       - Usuarios
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de acceso (JWT)
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de restablecimiento de contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: La nueva contraseña
 *     responses:
 *       200:
 *         description: Restablecimiento de contraseña exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/resetPass', verifyToken, usersCtrl.resetPass);

/**
 * @swagger
 * /users/putUser/{userId}:
 *   put:
 *     summary: Actualiza los datos de un usuario
 *     description: Actualiza los datos de un usuario basándose en su ID. El cuerpo de la solicitud debe contener los campos a actualizar.
 *     tags:
 *       - Usuarios
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
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
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
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *               upa:
 *                 type: string
 *     responses:
 *       204:
 *         description: Actualización exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updatedUser:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 *       404:
 *         description: No se encontró el usuario
 *       500:
 *         description: Error interno del servidor
 */
router.put("/putUser/:userId", verifyToken, usersCtrl.updateUserById);

/**
 * @swagger
 * /users/forgetPassword:
 *   post:
 *     summary: Genera un token para restablecer la contraseña
 *     description: Genera un token para restablecer la contraseña y envía un correo electrónico al usuario con el token.
 *     tags:
 *       - Usuarios
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
 *                 format: email
 *     responses:
 *       200:
 *         description: Revisa tu correo electrónico
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
 *         description: Error interno del servidor
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 */
router.post('/forgetPassword', verifyToken, usersCtrl.forgotPassword);

/**
 * @swagger
 * /users/resetPassword:
 *   post:
 *     summary: Restablece la contraseña de un usuario
 *     description: Utiliza el token proporcionado para restablecer la contraseña del usuario.
 *     tags:
 *       - Usuarios
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de acceso (JWT)
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token para restablecer la contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Éxito, la contraseña se ha restablecido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: El link expiró o error interno del servidor
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         roles:
 *           type: array
 *           items:
 *             type: string
 */
router.post('/resetPassword', verifyToken, usersCtrl.resetPassword);

export default router; 