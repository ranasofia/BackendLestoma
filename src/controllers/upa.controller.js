import Upa from '../models/Upa'
import User from '../models/User'
import Frame from '../models/Frame'

export const createUPA = async (req, res) => {

    const {name, location} = req.body
    console.log(req.body)

    const newUpa = new Upa({name, location})

    const upaSaved = await newUpa.save()

    res.status(201).json(upaSaved)
}

export const getUPAS = async (req, res) => {

    const upas = await Upa.find().populate({ path: "location", model: "Location", select: "name"})
    .exec((err,upas) => {
         res.json(upas);
    }) 
}
export const getUpaById = async (req, res, next) => {
  const upaId = req.params.upaId;
  try {
    const upa = await Upa.findById(upaId).exec();
    if (!upa) {
      return res.status(404).json({ message: 'No se encontró ninguna UPA con el ID proporcionado' });
    }
    res.json(upa);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Algo salió mal al buscar la UPA' });
  }
}


export const editUPA = (req, res) => {
    
}

export const deleteUPA = (req, res) => {
    
}

export const getUserByUpa = async (req, res) => {
  const upaId = req.params.upaId;

  try {
    // Buscar la UPA correspondiente
    const upa = await Upa.findById(upaId);
    console.log(upa)
    if (!upa) {
      return res.status(404).json({ message: 'No se encontró la UPA.' });
    }

    // Buscar todos los usuarios con el ID de UPA correspondiente
    const users = await User.find({ upa: upa._id }).populate('roles');

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener la UPA y los usuarios vinculados.' });
  }
}

export const getFrameByUpa = async (req, res) => {
  const upaId = req.params.upaId;

  try {

    const upa = await Upa.findById(upaId);
    console.log(upa)
    if (!upa) {
      return res.status(404).json({ message: 'No se encontró la UPA.' });
    }

    const frame = await Frame.find({ NombreUpa: upa._id });

    res.status(200).json(frame);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener la UPA y la información vinculada.'});
  }
}


