import mongoose, { Schema, model } from 'mongoose'

const datosSchema = new mongoose.Schema({
    PH: Number,
    Temperatura: Number,
    Conductividad_Electrica: Number,
    Nivel_Agua: Number,
    Turbidez: Number,
    Oxigeno_Disuelto: Number
});
/*const estationSchema = new mongoose.Schema({

    NombreUpa: String,
    Temperatura: String,
    Humedad: String,
    Velocidad_Viento: Number() ,
    Dir_Viento:  Number() ,
    Lluvia: Number() 
});*/

const actuatorsSchema = new mongoose.Schema({
    Alarmas: Number,
    Recirculacion: Number,
    Alimentacion: Number,
    Oxigeno: Number
});

const frameSchema = new mongoose.Schema({
    NombreUpa:{ type: mongoose.Schema.Types.ObjectId, ref: "Upa"},
    Type_Com: Number,
    Dir_Esclavo: Number,
    Funtion: String,
    Dire_Registro: Number,
    //Estacion_Meteorologica: estationSchema,
    Datos: datosSchema,
    Actuadores: actuatorsSchema,
    CRC: String
},
{
    timestamps: true
});

const Frame = model("Frame", frameSchema);
module.exports = Frame