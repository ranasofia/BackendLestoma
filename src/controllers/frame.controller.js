import Frame from '../models/Frame'
const PDF = require('pdfkit')
const fs = require('fs');

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

export const getReport = async (req, res) => {

    const doc = new PDF();
    doc.text('Hola mundo con pdfkit', 30, 30);
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.set('Content-Disposition', 'inline; filename="report.pdf"');
      res.set('Content-Type', 'application/pdf');
      res.send(pdfData);
    });
    doc.end();

};