import Frame from '../models/Frame'

export const createFrame = async (req, res) => {

    const newFrame = await Frame.create(req.body)
    res.json(newFrame)
    console.log(newFrame)
}
export const getFrame = async (req, res) => {

    const frames = await Frame.find({});
    res.json(frames);

}

export const getFrameById = (req, res) => {

}


export const updateFrame = (req, res) => {

}

export const deleteFrame = (req, res) => {

}