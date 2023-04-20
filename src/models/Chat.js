import mongoose, { Schema, model } from 'mongoose'

const chatSchema = new mongoose.Schema({
    from:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requiered: true
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requiered: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
       // required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model('Chat', chatSchema);
