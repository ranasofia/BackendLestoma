import Upa from '../models/Upa'

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

