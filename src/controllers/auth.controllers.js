import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role';
import Upa from '../models/Upa';

export const registre = async (req, res) => {
    
    const { name, lastname, email, password, roles, upaId} = req.body;
    console.log(upaId)

    const user = await User.findOne({ email: email });
    if (user) {
        return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }
    const upa = await Upa.findById(upaId);

    const newUser = new User({
        name,
        lastname,
        email,
        password,
        upa: upa._id
    });

    

    if (roles){
        const foundRoles = await Role.find({id_rol: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    
    } else {
        const role = await Role.findOne({id_rol: 3})
        newUser.roles = [role._id];
    }
    const saveUser = await newUser.save();
    console.log(saveUser)


    const token = jwt.sign({name: saveUser.name, lastname: saveUser.lastname, email: saveUser.email, rol: saveUser.roles, upa: saveUser.upa},config.SECRET,{
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
    
    const token = jwt.sign({id: userFound._id, name: userFound.name, lastname: userFound.lastname, email: userFound.email, rol: userFound.roles,upa: userFound.upa}, config.SECRET,
    {
        expiresIn: 86400
    })

    res.json({token})

}

/* exports.getUsers = async (req, res) => {

    await User.find()
    .populate({path: "roles", model: "Role", select: "id_rol name_rol"})
    .exec((err, users) => {
      if (err) {
        res.status(500).send({ message: error.message });
      } else {
        res.status(200).send({
          result: users,
        });
      }
    })


    
} */

export const getUsers = async (req, res) => {

    const users = await User.find()
    .populate({path: "roles", model: "Role", select: "id_rol name_rol"})
    .exec((err, users) => {
        res.json(users);
    })


    
}

export const getUsersWithRole2 = async (req, res) => {
  try {
    const role2 = await Role.findOne({ id_rol: 2 });

    const users = await User.find({ roles: { $in: [role2._id] } })
      .select('-password') // excluye el campo password de la respuesta
      .populate({ path: 'roles', model: 'Role', select: 'id_rol name_rol' })
      .exec();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = async (req, res) => {
    
    const { userId } = req.params;

    const users = await User.findById(userId);
    res.status(200).json(users);

}

export const getUserLogged = async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, config.SECRET);
      const userId = decoded.id;
      const user = await User.findOne({ email: decoded.email });
      console.log(user);
      res.status(200).json({ email: user.email });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: 'Token inválido' });
    }
};

export const getIdUserLogged = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.SECRET);
    const userId = decoded.id;
    const user = await User.findOne({ email: decoded.email });
    res.status(200).json({ userId:user._id });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Token inválido' });
  }
};
  