import Upa from '../models/Upa';
import Location from '../models/Location';

export const createInitialData = async () => {
  try {
    const countUpa = await Upa.estimatedDocumentCount();
    const countLocation = await Location.estimatedDocumentCount();

    if (countUpa > 0 || countLocation > 0) {
      return;
    }

    const locations = await Location.create([
      { name: 'Mosquera' },
      { name: 'Facatativa' },
    ]);

    const upas = await Upa.create([
      { name: 'El vergel', location: locations[0]._id },
      { name: 'Lestoma', location: locations[1]._id },
    ]);

    console.log('Initial data created successfully');
  } catch (error) {
    console.error(`Error creating initial data: ${error.message}`);
  }
};

