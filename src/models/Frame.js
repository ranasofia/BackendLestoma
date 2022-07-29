import {Schema,model} from 'mongoose'

const frameSchema = new Schema({
    typeCom: {
        type: Boolean,
        required: true
    },
    dirSlave: {
        type: Number,
        required: true,
    },
    functionFrame: {
        type: String,

    },
    dirReg: {
        type: Number,
        required: true
    },

    datosTxAll: {
        type: String,
        required: true
    },
    datosRxAll: {
        type: String,
        required: true
    },

    sens1: {
        type: Number,
        required: true
    },
    sens2: {
        type: Number,
        required: true
    },
    sens3: {
        type: Number,
        required: true
    },
    sens4: {
        type: Number,
        required: true
    },
    sens5: {
        type: Number,
        required: true
    },
    sens6: {
        type: Number,
        required: true
    },
    sens7: {
        type: Number,
        required: true
    },
    sens8: {
        type: Number,
        required: true
    },
    sens9: {
        type: Number,
        required: true
    },
    sens10: {
        type: Number,
        required: true
    },
    crc: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    upa: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

export default model('Frame', frameSchema);