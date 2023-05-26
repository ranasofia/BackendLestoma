import mongoose, { Schema, model } from 'mongoose'

const SenActSchema = new mongoose.Schema({
    n: String,
    v: Number,
    e: Number
})



const datosSchema = new mongoose.Schema({
    PH: Number,
    Temp: Number,
    C_Electrica: Number,
    N_Agua: Number,
    Tu: Number,
    O_Dis: Number,
    S_1: Number

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
    Recir: Number,
    Alim: Number,
    Ox: Number,
    
});

const frameSchema = new mongoose.Schema({
    idUPA:{ type: mongoose.Schema.Types.ObjectId, ref: "Upa"},
    T_Com: Number,
    D_Esc: Number,
    Fn: String,
    D_Reg: Number,
    //Estacion_Meteorologica: estationSchema,
    Sensores: datosSchema,
    Act: actuatorsSchema,
    CRC: String
},
{
    timestamps: true
});


const minMaxSchema = new mongoose.Schema({
    n: Number,
    m: Number
});

const rangeSchema = new mongoose.Schema({
    PH: minMaxSchema,
    Temp: minMaxSchema,
    C_Electrica: minMaxSchema,
    N_Agua: minMaxSchema,
    Tu: minMaxSchema,
    O_Dis: minMaxSchema,

});


const Frame = model("Frame", frameSchema);
module.exports = Frame