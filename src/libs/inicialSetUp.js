import Role from '../models/Role'

export const createRoles = async () => {

  try {
    const count = await Role.estimatedDocumentCount()

    if (count > 0) return;
 
    const values = await Promise.all([
     new Role({id_rol: 1}).save(),
     new Role({id_rol: 2}).save(),
     new Role({id_rol: 3}).save(),
    ])
 
    console.log(values);
    
  } catch (error) {
    console.log(error);
    
  }
}