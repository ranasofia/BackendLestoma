import Frame from '../models/Frame'
const faker = require('faker');
const mongoose = require('mongoose');


exports.createData = async (req, res) => {
  // Obtener los datos enviados por el cliente
  const { NombreUpa, Type_Com, Dir_Esclavo, Funtion,Dire_Registro,Estacion_Meteorologica,CRC} = req.body;
  
  // Generar valores aleatorios para temperatura, pH y nivel de agua
  const Datos ={
  PH  : faker.random.number({ min: 15, max: 30 }),
  Temperatura : faker.random.number({ min: 5, max: 8 }),
  Conductividad_Electrica : faker.random.number({ min: 0, max: 100 }),
  Nivel_Agua : faker.random.number({ min: 0, max: 100 }),
  Turbidez : faker.random.number({ min: 0, max: 100 }),
  Oxigeno_Disuelto : faker.random.number({ min: 0, max: 100 })
  };
  

  const newFrame = new Frame({
    NombreUpa,
    Type_Com,
    Dir_Esclavo,
    Funtion,
    Dire_Registro,
    Estacion_Meteorologica,
    Datos,
    CRC
  });

  const CreatedFrame = await newFrame.save();


     res.status(201).json(CreatedFrame);
  } ;

export const createFrame = async (req, res) => {

    const newFrame = await Frame.create(req.body)
    res.json(newFrame)
    console.log(newFrame)
}
export const getFrame = async (req, res) => {

    const frames = await Frame.find({});
    res.json(frames);

}

export const getFrameById = (req, res) => {

}


export const updateFrame = (req, res) => {

}

export const deleteFrame = (req, res) => {

}
