import { Schema, model } from 'mongoose'
const Joi = require('@hapi/joi');

const roleSchema = new Schema(
    {
        /* Para que sea requerido este campo: id_rol: Joi.number().required(), */
        id_rol: Joi.number(),
    },
    {
        versionKey: false,
    }
);


export default model("Role", roleSchema);