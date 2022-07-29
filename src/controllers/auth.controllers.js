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
        password: await User.encriptPass(password)
    });

    if (roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    
    }else {
        const role = await Role.findOne({name: 'user'})
        newUser.roles = [role._id];
    }
    const saveUser = await newUser.save();
    console.log(saveUser)

    const token = jwt.sign({id: saveUser._id},config.SECRET,{
        expiresIn: 86400 //1 day
    })

    res.status(200).json({token})
    
}

export const signin = async (req, res) => {

    const userFound = await User.findOne({email: req.body.email}).populate("roles")
    console.log(userFound)
    
    if (!userFound) return res.status(400).json({message:'Usuario no encontrado'})

    const matchPassword = await User.comparePass(req.body.password, userFound.password)

    if (!matchPassword) return res.status(401).json({token: null, message: 'Contraseña incorrecta'})
    
    const token = jwt.sign({id: userFound._id}, config.SECRET,{
        expiresIn: 86400
    })

    res.json({token})


    
}