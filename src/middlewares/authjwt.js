import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    //console.log("Token recibido:", token); // Agrega un mensaje de registro

    if (!token) return res.status(401).json('Acceso denegado, el token no existe o expiró.')

    try {
        const decoded = jwt.verify(token, config.SECRET)
        //console.log("Token decodificado:", decoded); // Agrega un mensaje de registro

        req.userId = decoded.id; // Adjunta el ID de usuario a la solicitud

        next();
    } catch (error) {
        //console.log("Error al verificar el token:", error); // Agrega un mensaje de registro
        return res.status(401).json('Acceso denegado, el token no es válido o expiró.')
    }
}