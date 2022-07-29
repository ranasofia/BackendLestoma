import Frame from '../models/Frame'


export const createFrame = async (req,res) =>{
    const {typeCom, dirSlave, functionFrame, dirReg, datosTxAll, datosRxAll, sens1, sens2,
    sens3,sens4,sens5,sens6,sens7,sens8,sens9,sens10,crc,user,upa,date} = req.body

    const newFrame = new Frame({typeCom, dirSlave, functionFrame, dirReg, datosTxAll, 
    datosRxAll, sens1, sens2, sens3,sens4,sens5,sens6,sens7,sens8,sens9,sens10,crc,
    user,upa,date});

    const savedFrame = await newFrame.save()
    
    res.status(201).json(savedFrame)
}

export const getFrame = async (req,res) =>{
   
    const frames = await Frame.find();
    res.json(frames)
    
}

export const getFrameById = (req,res) =>{

}


export const updateFrame = (req,res) =>{

}

export const deleteFrame = (req,res) =>{

}