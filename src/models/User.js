import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" },
    ],},
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.statics.encriptPass = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
userSchema.statics.comparePass = async (password, newPass) =>{
    return await bcrypt.compare(password, newPass)
}
export default model('User',userSchema);
