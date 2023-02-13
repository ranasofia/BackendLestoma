import Frame from '../models/Frame'
import jwt from 'jsonwebtoken'
import config from '../config'

export const createFrame = async (req, res) => {

    const newFrame = await Frame.create(req.body)
    res.json(await Frame.find({}))
    console.log(newFrame)
}
export const getFrame = async (req, res) => {

    const frame = Frame.find({})
    console.log(frame)
    res.json(frames)

}

export const getFrameById = (req, res) => {

}


export const updateFrame = (req, res) => {

}

export const deleteFrame = (req, res) => {

}