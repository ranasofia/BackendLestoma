import { Schema, model } from 'mongoose'
const mongoose = require('mongoose');

const upaSchema = new mongoose.Schema(
    {
        name: {type:String},
        location: { type: mongoose.Schema.Types.ObjectId, ref: "Location"}
    },
    {
        versionKey: false,
    }
);

export default mongoose.model('Upa',upaSchema);

