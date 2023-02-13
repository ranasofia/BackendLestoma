import Upa from '../models/Upa';

export const createUPAs = async () => {

  try {
    const count = await Upa.estimatedDocumentCount()

    if (count > 0) return;
 
    const values = await Promise.all([
     new Upa({name: 'Vergel', location: 'Facatativa'}).save(),
     new Upa({name: 'Lestoma', location: 'Mosquera'}).save(),
    ])
 
    console.log(values);
    
  } catch (error) {
    console.log(error);
    
  }
}