const mongoose = require('mongoose');
import Datos from '../models/Data'
const faker = require('faker');

/*function obtenerDa(req, res) {
  
  const temperatura = faker.random.number({min: 10, max: 35});
  const ph = faker.random.number({min: 0, max: 14, precision: 0.01});
  const nivelAgua = faker.random.number({min: 0, max: 100});
  const temperaturaAmbiente = faker.random.number({min: 10, max: 35});

 
  const datos = {
    temperatura: temperatura,
    ph: ph,
    nivelAgua: nivelAgua,
    temperaturaAmbiente: temperaturaAmbiente
  };
  const nuevoDato = new Datos(datos);
  nuevoDato.save((err, datoGuardado) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(datoGuardado);
  });
}

export const getAllData = async (req, res) => {

  const data = await Datos.find({});
  res.json(data);

}

module.exports = {
  obtenerDatos,
  getAllData
} /*
const mongoose = require('mongoose');
import Datos from '../models/Data'

function simularDatos(req, res) {
  setInterval(() => {
    // Generar valores aleatorios para cada sensor
    const temperatura = Math.random() * 100;
    const ph = Math.random() * 14;
    const nivelAgua = Math.random() * 100;
    const temperaturaAmbiente = Math.random() * 100;

    // Guardar los datos en la base de datos
    const datos = new Datos({
      temperatura,
      ph,
      nivelAgua,
      temperaturaAmbiente
    });
    datos.save((err, datoGuardado) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      console.log(datoGuardado);
    });
  }, 5000);
}


function obtenerDatos(req, res) {
  Datos.find({}, (err, datos) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(datos);
  });
}
module.exports = {
  obtenerDatos,
  simularDatos
}
*/