import User from '../models/User';
import Role from '../models/Role';
import config from '../config'


const nodemailer = require("nodemailer");
const randomstring = require("randomstring");


const sendResetPassword = async(name,email,token)=>{
    try{

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host:'smtp.gmail.com',
            port: 465,
            secure:false,
            requireTLS:true,
            auth:{
                user:config.EMAIL_USER,
                pass:config.EMAIL_PASSWORD
            }
        });

        const mailOption = {
            from:config.EMAIL_USER,
            to:email,
            subject:'Recuperar contraseña',
            html: '<p> Hola ' + name +', por favor da click al link para <a href="http://fishweb.herokuapp.com/restaurar-clave/'+ token+'">  restablecer tu contraseña</a>'
        }
        transporter.sendMail(mailOption,function(error,info){
            if(error){
                console.log(error);
            }
            else{
                console.log("Mail has been sent:-", info.response);
            }
        });
    } catch (error){
        res.status(400).send({success:false,msg:error.message});
    }
}

export const getUsers = async (req, res) => {

    const users = await User.find()
    .populate({path: "roles", model: "Role", select: "id_rol name_rol"})
    .exec((err, users) => {
        res.json(users);
    })

}

export const getUserById = async (req, res) => {
    
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const userResponse = {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          upa: user.upa
        };
        console.log(userResponse);
        return res.status(200).json({ userResponse });
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Error interno del servidor' });
      }

}

export const updateUserById = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true
    })
    res.status(204).json({updatedUser})
}

export const forgotPassword = async (req, res) => {
    try {

        const email = req.body.email;
        const userData = await User.findOne({email:email});
        
        if(userData){
            
           const randomString = randomstring.generate();
           const data = await User.updateOne({email:email},{$set:{token:randomString}});
           sendResetPassword(userData.name,userData.email,randomString);
           res.status(200).send({success:true, msg:"Revisa tu correo electronico."});

        }else{
            res.status(200).send({success:true, msg:"El correo no existe."});
        }

    } catch (error){
        res.status(400).send({success:false, msg:error.message});
    }
}

export const resetPass = async (req, res) => {
    try{

        const token = req.query.token;
        const tokenData = await User.findOne({token:token});
        console.log(tokenData);
        if (tokenData){
            const pass = req.body.password;
            
            const newPassword = await User.encriptPass(pass);
            
            const userData = await User.findByIdAndUpdate({_id:tokenData._id},{$set:{password:newPassword, token:''}},{new:true});
            console.log(userData);
            res.status(200).send({success:true, msg:"Exito.", data:userData});
        }else{
            res.status(200).send({success:false, msg:"El link expiro."});
        }


    }catch (error) {
        res.status(400).send({success:false, msg:error.message});
    }
}

export const resetPassword = async (req, res) => {
    try{

        const token = req.query.token;
        const tokenData = await User.findOne({token:token});
        console.log(tokenData);
        if (tokenData){
            const pass = req.body.password;
            
            const newPassword = await User.encriptPass(pass);
            
            const userData = await User.findByIdAndUpdate({_id:tokenData._id},{$set:{password:newPassword, token:''}},{new:true});
            console.log(userData);
            res.status(201).send({success:true, msg:"Exito.", data:userData});
        }else{
            res.status(400).send({success:false, msg:"El link expiro."});
        }


    }catch (error) {
        res.status(400).send({success:false, msg:error.message});
    }
}
