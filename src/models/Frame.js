import mongoose, { Schema, model } from 'mongoose'

const datosSchema = new mongoose.Schema({
    PH: Number,
    Temperatura: Number,
    Conductividad_Electrica: Number,
    Nivel_Agua: Number,
    Turbidez: Number,
    Oxigeno_Disuelto: Number
})
const estationSchema = new mongoose.Schema({

    NombreUpa: String,
    Temperatura: String,
    Humedad: String,
    Velocidad_Viento: Number() ,
    Dir_Viento:  Number() ,
    Lluvia: Number() 
});

const frameSchema = new mongoose.Schema({
    NombreUpa: String,
    Type_Com: Boolean,
    Dir_Esclavo: Number,
    Funtion: String,
    Dire_Registro: Number,
    Estacion_Meteorologica: estationSchema,
    Datos: datosSchema,
    CRC: Number
},
{
    timestamps: true
});

const Frame = model("Frame", frameSchema);
module.exports = Frame