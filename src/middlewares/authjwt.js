import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async (req,res,next) => {
    const token = req.headers["x-acces-token"];
    console.log(token)

    if(!token) return  res.status(403).json('Token no ingresado')

    const decoded = jwt.verify(token, config.SECRET)
    console.log(decoded)

    next()
}