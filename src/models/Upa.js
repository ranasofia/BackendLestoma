import { Schema, model } from 'mongoose'

const upaSchema = new Schema(
    {
        name: String,
    },
    {
        location: String,
    },
    {
        versionKey: false,
    }
);


export default model("Upa", upaSchema);