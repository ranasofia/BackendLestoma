import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    token: {type: String, default: ''},
    roles: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
},
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
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  })

  export default mongoose.model('User',userSchema);
