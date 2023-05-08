import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role';
import Upa from '../models/Upa';

export const registre = async (req, res) => {
    
  const { name, lastname, email, password, roles, upaId} = req.body;

  // Validación de entradas
  if (!name || !lastname || !email || !password || !upaId) {
      return res.status(400).json({ message: 'Por favor proporcione todos los campos obligatorios' });
  }

  // Validación de correo electrónico
  const user = await User.findOne({ email: email });
  if (user) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
  }

  // Validación de existencia de upaId
  const upa = await Upa.findById(upaId);
  if (!upa) {
      return res.status(400).json({ message: 'El upaId proporcionado no existe' });
  }

  const newUser = new User({
      name,
      lastname,
      email,
      password,
      upa: upa._id
  });

  // Validación de roles
  if (roles){
      const foundRoles = await Role.find({id_rol: {$in: roles}})
      if (foundRoles.length !== roles.length) {
          return res.status(400).json({ message: 'Uno o más de los identificadores de rol proporcionados son inválidos' });
      }
      newUser.roles = foundRoles.map(role => role._id)
  } else {
      const role = await Role.findOne({id_rol: 3})
      newUser.roles = [role._id];
  }
  
  const saveUser = await newUser.save();

  const token = jwt.sign({name: saveUser.name, lastname: saveUser.lastname, email: saveUser.email, rol: saveUser.roles, upa: saveUser.upa},config.SECRET,{
      expiresIn: 86400 //1 day
  })

  res.status(200).json({token})
  
}

export const signin = async (req, res) => {
  const { email, password } = req.body;

  // Validación de entradas
  if (!email || !password) {
      return res.status(400).json({ message: 'Por favor proporcione todos los campos obligatorios' });
  }

  // Validación de usuario
  const userFound = await User.findOne({email: email}).populate("roles");
  if (!userFound) {
      return res.status(400).json({message:'Usuario no encontrado'})
  }

  // Validación de contraseña
  const matchPassword = await User.comparePass(password, userFound.password)
  if (!matchPassword) {
      return res.status(401).json({token: null, message: 'Contraseña incorrecta'})
  }
  
  const token = jwt.sign({id: userFound._id, name: userFound.name, lastname: userFound.lastname, email: userFound.email, rol: userFound.roles,upa: userFound.upa}, config.SECRET,
  {
      expiresIn: 86400
  })

  res.json({token})
}


export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastname } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { name, lastname }, { new: true });


    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }

};


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
  // Validación de roles
  if (!req.user.roles.includes("Superadmin")) {
      return res.status(401).json({ message: 'No tiene permiso para acceder a esta información' });
  }

  const users = await User.find()
      .populate({path: "roles", model: "Role", select: "id_rol name_rol"})
      .exec((err, users) => {
          res.json(users);
      });
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
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
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
  