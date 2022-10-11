import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role';


export const registre = async (req, res) => {
    const { name, lastname, email, password, roles} = req.body;
    const newUser = new User({
        name,
        lastname,
        email,
        password,
    });

    if (roles){
        const foundRoles = await Role.find({id_rol: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    
    } else {
        const role = await Role.findOne({id_rol: 3})
/*         await Role.findOne({id_rol: 3}, function callback(error, role){
            console.log('Este es el error del id nulo: ', error)
            newUser.roles = [role._id];
        }) */
        newUser.roles = [role._id];
    }
    const saveUser = await newUser.save();
    console.log(saveUser)

    const token = jwt.sign({name: saveUser.name, lastname: saveUser.lastname, email: saveUser.email, rol: saveUser.roles},config.SECRET,{
        expiresIn: 86400 //1 day
    })

    res.status(200).json({token})
    
}

export const signin = async (req, res) => {

    const userFound = await User.findOne({email: req.body.email}).populate("roles");
    console.log(userFound)
    
    if (!userFound) return res.status(400).json({message:'Usuario no encontrado'})

    const matchPassword = await User.comparePass(req.body.password, userFound.password)

    if (!matchPassword) return res.status(401).json({token: null, message: 'Contraseña incorrecta'})
    
    const token = jwt.sign({name: userFound.name, lastname: userFound.lastname, email: userFound.email, rol: userFound.roles}, config.SECRET,{
        expiresIn: 86400
    })

    res.json({token})

    
}