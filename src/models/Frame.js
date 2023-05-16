import mongoose, { Schema, model } from 'mongoose'

const SenActSchema = new mongoose.Schema({
    p: Number,
    n: String,
    v: Number,
    e: Number,
})

const datosSchema = new mongoose.Schema({
    S_1: SenActSchema,
    S_2: SenActSchema,
    S_3: SenActSchema,
    S_4: SenActSchema,
    S_5: SenActSchema
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
    A_1: SenActSchema,
    A_2: SenActSchema,
    A_3: SenActSchema,
    A_4: SenActSchema,
    A_5: SenActSchema
});

const frameSchema = new mongoose.Schema({
    idUPA:{ type: mongoose.Schema.Types.ObjectId, ref: "Upa"},
    T_Com: Number,
    D_Esc: Number,
    Fn: String,
    D_Reg: Number,
    //Estacion_Meteorologica: estationSchema,
    Sen: datosSchema,
    Act: actuatorsSchema,
    CRC: String
},
{
    timestamps: true
});



const Frame = model("Frame", frameSchema);
module.exports = Frame