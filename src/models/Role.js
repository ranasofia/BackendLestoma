import { Schema, model } from 'mongoose'

const roleSchema = new Schema(
    {
        id_rol: String,
    },
    {
        versionKey: false,
    }
);


export default model("Role", roleSchema);