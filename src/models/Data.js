import mongoose, { Schema, model } from 'mongoose'

const datosSchema = new mongoose.Schema({
  temperatura: {
    type: Number,
    required: true
  },
  ph: {
    type: Number,
    required: true
  },
  nivelAgua: {
    type: Number,
    required: true
  },
  temperaturaAmbiente: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});


const Datos = model("Data", datosSchema);
module.exports = Datos