import mongoose, { Schema, model } from 'mongoose'



const sensorSchema = new mongoose.Schema({
    idUPA:{ type: mongoose.Schema.Types.ObjectId, ref: "Upa"},
    n: String,
    e: Number
},
{
    timestamps: true
});


const SensorData = model("SensorData", sensorSchema);
module.exports = SensorData