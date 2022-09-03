import Upa from '../models/Upa'

export const createUPA = async (req, res) => {

    const {name, location} = req.body
    console.log(req.body)

    const newUpa = new Upa({name, location})

    const upaSaved = await newUpa.save()

    res.status(201).json(upaSaved)
}

export const getUPAS = async (req, res) => {

    const upas = await Upa.find();
    res.json(upas)
     
}

export const getUPAbyId = async (req, res) => {
    
    const { upaId } = req.params;

    const upa = await Upa.findById(upaId);
    res.status(200).json(upa);

}

export const editUPA = (req, res) => {
    
}

export const deleteUPA = (req, res) => {
    
}