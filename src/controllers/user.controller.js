import User from '../models/User';
import Role from '../models/Role';

export const getUsers = async (req, res) => {

    const users = await User.find()
    .populate({path: "roles", model: "Role", select: "id_rol name_rol"})
    .exec((err, users) => {
        res.json({users});
    })

}

export const getUserById = async (req, res) => {
    
    const { userId } = req.params;

    const users = await User.findById(userId)
    .populate({path: "roles", model: "Role", select: "id_rol name_rol"})
    .exec((err, users) => {
        res.json({users});
    })

}

export const updateUserById = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true
    })
    res.status(204).json({updatedUser})
}