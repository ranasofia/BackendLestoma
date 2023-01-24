import Role from '../models/Role'

export const createRoles = async () => {

  try {
    const count = await Role.estimatedDocumentCount()

    if (count > 0) return;
 
    const values = await Promise.all([
     new Role({id_rol: 1, name_rol: "Superadministrador"}).save(),
     new Role({id_rol: 2, name_rol: "Administrador"}).save(),
     new Role({id_rol: 3, name_rol: "Auxiliar"}).save(),
    ])
 
    console.log(values);
    
  } catch (error) {
    console.log(error);
    
  }
}