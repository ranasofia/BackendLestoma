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
         res.json({upas});
    }) 
}
/*
export const getUsers = async (req, res) => {

    const users = await User.find()
    .populate({path: "roles", model: "Role", select: "id_rol name_rol"})
    .exec((err, users) => {
        res.json({users});
    })







export const getUPAS = async (req, res) => {
    try {
        const upas = await Upa.aggregate([
          {
            $lookup: {
              from: 'locations',
              localField: 'location',
              foreignField: '_id',
              as: 'location_info'
            }
          }
        ]);
        res.json(upas);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
*/

export const getUPAbyId = async (req, res) => {
    
    const { upaId } = req.params;

    const upa = await Upa.findById(upaId);
    res.status(200).json(upa);

}

export const editUPA = (req, res) => {
    
}

export const deleteUPA = (req, res) => {
    
}

