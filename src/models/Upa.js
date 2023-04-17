import { Schema, model } from 'mongoose'
const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema({
    name: String  
    
});

const upaSchema = new mongoose.Schema({
    name: String,
    location: locationSchema
});

export default mongoose.model('Upa',upaSchema);

