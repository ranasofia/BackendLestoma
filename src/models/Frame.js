import mongoose, { Schema, model } from 'mongoose'
/*
const plantasGrabaSchema = new mongoose.Schema({
    PH: Number,
    Temperatura: Number,
    Humedad: Number
})
const plantasRaizSchema = new mongoose.Schema({
    PH: Number,
    Temperatura: Number,
    Humedad: Number
})
const plantasNFTSchema = new mongoose.Schema({
    PH: Number,
    Temperatura: Number,
    Humedad: Number
})
const tanque4Schema = new mongoose.Schema({
    PH: Number,
    Temperatura: Number,
    Conductividad_Electrica: Number,
    Nivel_Agua: Number,
    Turbidez: Number,
    Oxigeno_Disuelto: Number
})
const tanque3Schema = new mongoose.Schema({
    PH: Number,
    Temperatura: Number,
    Conductividad_Electrica: Number,
    Nivel_Agua: Number,
    Turbidez: Number,
    Oxigeno_Disuelto: Number
})
const tanque2Schema = new mongoose.Schema({
    PH: Number,
    Temperatura: Number,
    Conductividad_Electrica: Number,
    Nivel_Agua: Number,
    Turbidez: Number,
    Oxigeno_Disuelto: Number
}) */
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
    /*Tanque_2: tanque2Schema,
    //Tanque_3: tanque3Schema,
    //Tanque_4: tanque4Schema,
    //PLantas_NFT: plantasNFTSchema,
    //PLantas_Raiz: plantasRaizSchema,
    //Plantas_Graba: plantasGrabaSchema, */
    CRC: Number
});

const Frame = model("Frame", frameSchema);
module.exports = Frame