import { Schema, model } from 'mongoose'

const locationSchema = new Schema(
    {
        name: String,
    },
    {
        versionKey: false,
    }
);
export default model("Location",locationSchema);