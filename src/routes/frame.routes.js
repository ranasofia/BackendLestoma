import {json, Router} from 'express'

const router = Router()
 
import * as frameCtrl from '../controllers/frame.controller'
import { verifyToken } from '../middlewares';

/**
 * @swagger
 * /frame/createFrame:
 *   post:
 *     summary: Crea un nuevo JSON
 *     description: Crea un nuevo JSON con los valores de la UPA
 *     tags:
 *       - Datos
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
 *               NombreUpa:
 *                 type: string
 *               Type_Com:
 *                 type: number
 *               Dir_Esclavo:
 *                 type: number
 *               Funtion:
 *                 type: string
 *               Dire_Registro:
 *                 type: number
 *               Estacion_Meteorologica:
 *                 type: object
 *                 properties:
 *                   Temperatura:
 *                     type: number
 *                   Humedad:
 *                     type: number
 *                   Velocidad_Viento:
 *                     type: number
 *                   Dir_Viento:
 *                     type: number
 *                   Lluvia:
 *                     type: number
 *               Datos:
 *                 type: object
 *                 properties:
 *                   PH:
 *                     type: number
 *                   Temperatura:
 *                     type: number
 *                   Conductividad_Electrica:
 *                     type: number
 *                   Nivel_Agua:
 *                     type: number
 *                   Turbidez:
 *                     type: number
 *                   Oxigeno_Disuelto:
 *                     type: number
 *               Actuadores:
 *                 type: object
 *                 properties:
 *                   Alarmas:
 *                     type: number
 *                   Recirculacion:
 *                     type: number
 *                   Alimentacion:
 *                     type: number
 *                   Oxigeno:
 *                     type: number
 *     responses:
 *       201:
 *         description: Datos creados con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 NombreUpa:
 *                   type: string
 *                 Type_Com:
 *                   type: number
 *                 Dir_Esclavo:
 *                   type: number
 *                 Funtion:
 *                   type: string
 *                 Dire_Registro:
 *                   type: number
 *                 Estacion_Meteorologica:
 *                   type: object
 *                   properties:
 *                     Temperatura:
 *                       type: number
 *                     Humedad:
 *                       type: number
 *                     Velocidad_Viento:
 *                       type: number
 *                     Dir_Viento:
 *                       type: number
 *                     LLuvia:
 *                       type: number
 *                 Datos:
 *                   type: object
 *                   properties:
 *                     PH:
 *                       type: number
 *                     Temperatura:
 *                       type: number
 *                     Conductividad_Electrica:
 *                       type: number
 *                     Nivel_Agua:
 *                       type: number
 *                     Turbidez:
 *                       type: number
 *                     Oxigeno_Disuelto:
 *                       type: number
 *                 CRC:
 *                   type: number
 *       400:
 *         description: Datos de entrada incorrectos
 */
router.post('/createFrame', verifyToken, frameCtrl.createFrame);

router.post('/obtener', verifyToken, frameCtrl.createData);

/**
 * @swagger
 * /frame/getAll:
 *   get:
 *     summary: Obtiene todos los JSON de las UPAS
 *     description: Retorna una lista con todos los JSON almacenados en el sistema
 *     tags:
 *       - Datos
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
 *         description: Obtiene el ultimo JSON de datos registrado en el sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 NombreUpa:
 *                   type: string
 *                 Type_Com:
 *                   type: number
 *                 Dir_Esclavo:
 *                   type: number
 *                 Funtion:
 *                   type: string
 *                 Dire_Registro:
 *                   type: number
 *                 Estacion_Meteorologica:
 *                   type: object
 *                   properties:
 *                     Temperatura:
 *                       type: number
 *                     Humedad:
 *                       type: number
 *                     Velocidad_Viento:
 *                       type: number
 *                     Dir_Viento:
 *                       type: number
 *                     LLuvia:
 *                       type: number
 *                 Datos:
 *                   type: object
 *                   properties:
 *                     PH:
 *                       type: number
 *                     Temperatura:
 *                       type: number
 *                     Conductividad_Electrica:
 *                       type: number
 *                     Nivel_Agua:
 *                       type: number
 *                     Turbidez:
 *                       type: number
 *                     Oxigeno_Disuelto:
 *                       type: number
 *                 CRC:
 *                   type: number
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 */
router.get('/getAll', verifyToken, frameCtrl.getFrame)

router.get('/getLast', verifyToken, frameCtrl.getLast)

/**
 * @swagger
 * /frame/getLastFrameUpa/{upaId}:
 *   get:
 *     summary: Obtiene el último conjunto de datos para una UPA específica
 *     description: Retorna el último conjunto de datos, es decir el ultimo JSON para una UPA específica
 *     tags:
 *       - Datos
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
 *         description: ID de la UPA
 *     responses:
 *       200:
 *         description: Último conjunto de datos para la UPA especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 NombreUpa:
 *                   type: string
 *                 Type_Com:
 *                   type: number
 *                 Dir_Esclavo:
 *                   type: number
 *                 Funtion:
 *                   type: string
 *                 Dire_Registro:
 *                   type: number
 *                 Estacion_Meteorologica:
 *                   type: object
 *                   properties:
 *                     Temperatura:
 *                       type: number
 *                     Humedad:
 *                       type: number
 *                     Velocidad_Viento:
 *                       type: number
 *                     Dir_Viento:
 *                       type: number
 *                     LLuvia:
 *                       type: number
 *                 Datos:
 *                   type: object
 *                   properties:
 *                     PH:
 *                       type: number
 *                     Temperatura:
 *                       type: number
 *                     Conductividad_Electrica:
 *                       type: number
 *                     Nivel_Agua:
 *                       type: number
 *                     Turbidez:
 *                       type: number
 *                     Oxigeno_Disuelto:
 *                       type: number
 *                 CRC:
 *                   type: number
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 *       404:
 *         description: No se encontró la UPA
 *       500:
 *         description: Error al obtener la última trama vinculada a la UPA
 */
router.get('/getLastFrameUpa/:upaId', verifyToken, frameCtrl.getLastFrameByUpa)

/**
 * @swagger
 * /frame/getAllFrameUpa/{upaId}:
 *   get:
 *     summary: Obtiene todos los conjuntos de datos para una UPA específica
 *     description: Retorna todos los conjuntos de datos, es decir JSON almacenados para una UPA específica
 *     tags:
 *       - Datos
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
 *         description: ID de la UPA
 *     responses:
 *       200:
 *         description: Todos los conjuntos de datos (JSON) para la UPA especificada
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 *       404:
 *         description: No se encontró la UPA
 *       500:
 *         description: Error al obtener todas las tramas vinculadas a la UPA
 */
router.get('/getAllFrameUpa/:upaId', verifyToken, frameCtrl.getAllFrameByUpa)

router.get('/getAllFrameUpa/:upaId',frameCtrl.getLastFrameByUpaDev)

router.post('/getReport', frameCtrl.getReport)

/**
 * @swagger
 * /frame/getFrameVariablesDate:
 *   post:
 *     summary: Obtiene conjuntos de datos para un rango de fechas y un conjunto de variables especificados (Usado para generar la grafica)
 *     description: Retorna los conjuntos de datos que corresponden a un rango de fechas y un conjunto de variables especificados
 *     tags:
 *       - Datos
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
 *               fechaInicio:
 *                 type: string
 *                 format: date-time
 *               fechaFin:
 *                 type: string
 *                 format: date-time
 *               variables:
 *                 type: array
 *                 items:
 *                   type: string
 *               nombreUpa:
 *                 type: string
 *     responses:
 *       200:
 *         description: Conjuntos de datos correspondientes a los criterios especificados
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 *       500:
 *         description: Error al obtener los datos
 */
router.post('/getFrameVariablesDate', verifyToken, frameCtrl.getFrame_DateVariables)

/**
 * @swagger
 * /frame/getCRC:
 *   get:
 *     summary: Obtiene el CRC de la última trama
 *     description: Obtiene el Cyclic Redundancy Check (CRC) de los datos de la última trama y lo actualiza en la base de datos.
 *     tags:
 *       - Datos
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
 *         description: CRC calculado y actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CRC:
 *                   type: string
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 *       500:
 *         description: Error al obtener los datos o al calcular el CRC
 */
router.get('/getCRC', verifyToken, frameCtrl.getCRC)

router.get('/:frameId', verifyToken, frameCtrl.getFrameById)

router.put('/:frameId', verifyToken, frameCtrl.updateFrame)

router.delete('/deleteFrame', verifyToken, frameCtrl.deleteFrame)

router.put('/modifyFrame/:id', verifyToken, frameCtrl.updateData);

/**
 * @swagger
 * /frame/getDataReport:
 *   post:
 *     summary: Obtiene los datos para el informe
 *     description: Obtiene los datos en un rango de fechas específico, para las variables seleccionadas y para la UPA especificada.
 *     tags:
 *       - Datos
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
 *               fechaInicio:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de inicio para el rango de fechas (ISO 8601)
 *               fechaFin:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de fin para el rango de fechas (ISO 8601)
 *               variables:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de las variables a seleccionar
 *               nombreUpa:
 *                 type: string
 *                 description: Nombre de la UPA a filtrar
 *     responses:
 *       200:
 *         description: Datos obtenidos con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *       400:
 *         description: Datos de entrada incorrectos
 *       401:
 *         description: Acceso denegado, token no válido o expirado
 *       404:
 *         description: No se encontraron datos
 *       500:
 *         description: Error al obtener los datos
 */
router.post('/getDataReport', frameCtrl.getDataReport)

export default router;
