import { Schema, model } from 'mongoose'
const Joi = require('@hapi/joi');

const roleSchema = new Schema(
    {
        id_rol: Joi.number(),
    },
    {
        versionKey: false,
    }
);


export default model("Role", roleSchema);