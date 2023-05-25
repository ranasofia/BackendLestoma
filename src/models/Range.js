import mongoose, { Schema, model } from 'mongoose'

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
    S_1: minMaxSchema,
    S_2: minMaxSchema
},
{
    timestamps: true
});


const Range = model("Range", rangeSchema);
module.exports = Range