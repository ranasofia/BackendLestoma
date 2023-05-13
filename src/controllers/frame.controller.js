import Frame from '../models/Frame'
const faker = require('faker');
const mongoose = require('mongoose');
const PDF = require('pdfkit-construct')
import Upa from '../models/Upa' 




exports.createData = async (req, res) => {

  //const { NombreUpa, Type_Com, Dir_Esclavo, Funtion,Dire_Registro,Estacion_Meteorologica,CRC} = req.body;
  const { idUPA, T_Com, D_Esc, Fn,D_Reg,CRC} = req.body;

  const Datos ={
  PH  : faker.random.number({ min: 15, max: 30 }),
  Temp : faker.random.number({ min: 5, max: 8 }),
  C_Electrica : faker.random.number({ min: 0, max: 100 }),
  N_Agua : faker.random.number({ min: 0, max: 100 }),
  Tu : faker.random.number({ min: 0, max: 100 }),
  O_Di : faker.random.number({ min: 0, max: 100 })
  };
  

  const newFrame = new Frame({
    idUPA,
    T_Com,
    D_Esc,
    Fn,
    D_Reg,
    Sensores,
    Act,
    CRC
  });

  const CreatedFrame = await newFrame.save();
  res.status(201).json(CreatedFrame);
  
};

export const createFrame = async (req, res) => {
  try {
     
  
    const newFrame = await Frame.create(req.body);
    console.log(newFrame);
    const crc = require('crc');
    const { T_Com, D_Esc, Fn, D_Reg, Sensores, Act } = newFrame;
    //const { Temperatura, Humedad, Velocidad_Viento, Dir_Viento, Lluvia } = Estacion_Meteorologica;
    const { PH, Temp, C_Electrica, N_Agua, Tu, O_Dis } = Sensores;
    const { Alarmas, Recir, Alim, Ox } = Act;
    console.log(newFrame);
    const data = `${T_Com}${D_Esc}${Fn}${D_Reg}${PH}${Temp}${C_Electrica}${N_Agua}${Tu}${O_Dis}${Alarmas}${Recir}${Alim}${Ox}`;
    const crc16modbus = crc.crc16modbus(Buffer.from(data));
    const result = crc16modbus.toString(16).toUpperCase();
    await Frame.findByIdAndUpdate(newFrame._id, { CRC: result }, { new: true });

    newFrame.CRC = result;

    console.log(result);
    res.json(newFrame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};



export const createFrameDev = async (req, res) => {
  /*const {idUPA, T_Com, D_Esc, Fn, D_Reg,  Sensores, Act } = req.body;
  if (!idUPA || !T_Com || !D_Esc || !Fn || !D_Reg || !Sensores || !Act) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }*/
  
  try {
     
  
    const newFrame = await Frame.create(req.body);
    console.log(newFrame);
    const crc = require('crc');
    const { T_Com, D_Esc, Fn, D_Reg, Sensores, Act } = newFrame;
    //const { Temperatura, Humedad, Velocidad_Viento, Dir_Viento, Lluvia } = Estacion_Meteorologica;
    const { PH, Temp, C_Electrica, N_Agua, Tu, O_Dis } = Sensores;
    const { Alarmas, Recir, Alim, Ox } = Act;
    console.log(newFrame);
    const data = `${T_Com}${D_Esc}${Fn}${D_Reg}${PH}${Temp}${C_Electrica}${N_Agua}${Tu}${O_Dis}${Alarmas}${Recir}${Alim}${Ox}`;
    const crc16modbus = crc.crc16modbus(Buffer.from(data));
    const result = crc16modbus.toString(16).toUpperCase();
    await Frame.findByIdAndUpdate(newFrame._id, { CRC: result }, { new: true });

    newFrame.CRC = result;

    console.log(result);
    res.json(newFrame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};


export const getFrame = async (req, res) => {

    const frames = await Frame.find({});
    res.json(frames);

}

export const getFrameById = async (req, res) => {

}


export const updateFrame = (req, res) => {

}

export const deleteFrame = (req, res) => {

}

export const getFrame_DateVariables = async (req, res, next) => {
    const { fechaInicio, fechaFin, variables, nombreUpa } = req.body;

    // Crea un objeto de selección vacío
    const seleccion = {};

    // Agrega las variables seleccionadas a la selección del usuario
    if (variables) {
        variables.forEach(variable => {
            seleccion[`Datos.${variable}`] = 1;
        });
    }

    seleccion['createdAt'] = 1;

    // Agrega la condición de filtro por nombreUpa si se proporciona
    const filtroNombreUpa = nombreUpa ? { "NombreUpa": nombreUpa } : {};

    // Realiza la consulta en  la base de datos utilizando el rango de fechas y la selección de variables
    Frame.find({
        ...filtroNombreUpa,
        updatedAt: {
            $gte: fechaInicio,
            $lte: fechaFin
        }
    })
    .select(seleccion) // Aplica la selección al resultado de la consulta
    .exec((err, datos) => {
        if (err) {
            return next(err);
        }

        res.json(datos);
    });
};


export const getReport = async (req, res, next) => {
    const { fechaInicio, fechaFin, variables } = req.body;

    // Crea un objeto de selección vacío
    const seleccion = {};

    // Agrega las variables seleccionadas a la selección del usuario
    if (variables) {
        variables.forEach(variable => {
            seleccion[`Datos.${variable}`] = 1;
        });
    }
    seleccion['createdAt'] = 1;

    // Realiza la consulta en la base de datos utilizando el rango de fechas y la selección de variables
    Frame.find({
        updatedAt: {
            $gte: fechaInicio,
            $lte: fechaFin
        }
    })
    .select(seleccion) // Aplica la selección al resultado de la consulta
    .exec((err, datos) => {
        if (err) {
            return next(err);
        }

        const datosTabla = datos;


        if (!datosTabla) {
            return res.status(404).send("No se encontraron datos");
        }

        const doc = new PDF();

        // Crear filas de la tabla
        const rows = datosTabla.map(d => {
            const row = {
                Fecha: new Date(d.createdAt).toLocaleDateString('es-ES')
            };

            // Agregar cada variable seleccionada a la fila de la tabla
            if (variables) {
                variables.forEach(variable => {
                    row[variable] = d.Datos[variable];
                });
            }

            return row;
        });

        // Crear las columnas de la tabla basadas en las variables seleccionadas
        const columns = [
            { key: 'Fecha', label: 'Fecha', align: 'left'}
        ];

        if (variables && variables.length > 0) {
            variables.forEach(variable => {
                columns.push({
                    key: variable,
                    label: variable,
                    align: 'left'
                });
            });
        }

        // Obtener la fecha actual
        const fechaActual = new Date();

        // Formatear la fecha como una cadena de texto
        const fechaActualTexto = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;

        // Agregar la fecha al documento
        doc.font('Helvetica').text(`Fecha del reporte: ${fechaActualTexto}`, {
            align: 'right'
        });

        doc.moveDown();

        // Agregar logo en la parte superior izquierda
        doc.image('src/assets/images/icon_fish.png', 50, 50, { width: 50 });

        // Mover el cursor a la posición siguiente
        doc.moveDown();

        doc.font('Helvetica-Bold').text('REPORTE DE VARIABLES', {
            align: 'center'
        });

        doc.moveDown();

        doc.font('Helvetica').text('LABORATORIO EXPERIMENTAL DE SISTEMAS TECNOLOGICOS ORIENTADOS A MODELOS ACUAPONICOS (LESTOMA)', {
            align: 'center'
        });

        doc.moveDown();

        doc.font('Helvetica').text(`En la siguiente tabla se evidencia el valor de las variables seleccionadas (${variables.join(', ')}) en el rango de fechas establecido (${fechaInicio} - ${fechaFin})`, {
            align: 'justify'
        });

        doc.moveDown();
        
        doc.translate(0, 220); // Ajusta la posición de la tabla

        const numColumns = columns.length;
        const columnWidth = (doc.page.width - 20) / numColumns;

        const tableOptions = {
            width: doc.page.width,
            margin: { top: 50, right: 50, bottom: 50, left: 50 },
            align: 'center'
        };

        // set column width dynamically based on page width
        columns.forEach(column => {
        column.width = columnWidth;
        });

        doc.addTable(columns, rows, tableOptions);

        doc.render();
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfData = Buffer.concat(buffers);
          res.set('Content-Disposition', 'inline; filename="report.pdf"');
          res.set('Content-Type', 'application/pdf');
          res.send(pdfData);
        });
        doc.end();
    });
};

export const getDataReport = async (req, res, next) => {
    try {
      const { fechaInicio, fechaFin, variables, nombreUpa } = req.body;
  
      // Validar los parámetros de entrada
      if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ message: "Las fechas son requeridas" });
      }
  
      // Convertir las fechas al formato de fecha de la base de datos
      const fechaInicioDB = new Date(fechaInicio).toISOString();
      const fechaFinDB = new Date(fechaFin).toISOString();
  
      // Crear un objeto de selección vacío
      const seleccion = {};
  
      // Agregar las variables seleccionadas a la selección del usuario
      if (variables) {
        variables.forEach((variable) => {
          seleccion[`Datos.${variable}`] = 1;
        });
      }
      seleccion["createdAt"] = 1;
  
      // Agregar la condición de filtro por nombreUpa si se proporciona
      const filtroNombreUpa = nombreUpa ? { "NombreUpa": nombreUpa } : {};
  
      // Realizar la consulta en la base de datos utilizando el rango de fechas, la selección de variables y el filtro por nombreUpa
      const datos = await Frame.find({
        ...filtroNombreUpa,
        updatedAt: {
          $gte: fechaInicioDB,
          $lte: fechaFinDB,
        },
      })
        .select(seleccion) // Aplicar la selección al resultado de la consulta
        .exec();
  
      // Manejar el caso en que no se encontraron datos
      if (datos.length === 0) {
        return res.status(404).json({ message: "No se encontraron datos" });
      }
  
      // Transformar los datos en un arreglo de objetos plano para que puedan ser serializados en formato JSON
      const datosJSON = datos.map((d) => {
        const obj = {
          fecha: new Date(d.createdAt).toLocaleDateString("es-ES"),
        };
  
        // Agregar cada variable seleccionada al objeto
        if (variables) {
          variables.forEach((variable) => {
            obj[variable] = d.Datos[variable];
          });
        }
  
        return obj;
      });
  
      // Devolver la respuesta al cliente
      return res.status(200).json(datosJSON);
    } catch (error) {
      // Manejar cualquier error que se produzca durante la ejecución de la función
      next(error);
    }
  };  


export const getCRC = async (req, res) => {

    const crc = require('crc');

    const lastFrame = await Frame.findOne({}).sort({ _id: -1 });

    console.log(lastFrame);

    const {PH, Temperatura, Conductividad_Electrica, Nivel_Agua, Turbidez, Oxigeno_Disuelto } = lastFrame.Datos;
    const data = `${PH}${Temperatura}${Conductividad_Electrica}${Nivel_Agua}${Turbidez}${Oxigeno_Disuelto}`;
    // const data = PH.concat(Temperatura, Conductividad_Electrica, Nivel_Agua, Turbidez, Oxigeno_Disuelto);
    const crc16modbus = crc.crc16modbus(Buffer.from(data));
    const result = crc16modbus.toString(16).toUpperCase();
    //const result2 = parseInt(result, 16);

    console.log(result); // imprime el resultado en hexadecimal
    console.log(data);
    res.json(result);

    const updatedFrame = await Frame.findByIdAndUpdate(lastFrame._id, { CRC: result  }, { new: true });
    console.log(updatedFrame);

}

export const getLast = async (req, res) => {
    try {
        const lastRecord = await Frame.findOne({}).sort({ _id: -1 });
        res.json(lastRecord);
    } catch (error) {
        console.log(error);
    }
}

export const getLastFrameByUpa = async (req, res) => {
    const upaId = req.params.upaId;

    try {
      const upa = await Upa.findById(upaId);
      if (!upa) {
        return res.status(404).json({ message: 'No se encontró la UPA.' });
      }
  
      const lastFrame = await Frame.findOne({ idUPA: upa._id }).sort({ _id: -1 });
  
      res.status(200).json(lastFrame);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al obtener la última trama vinculada a la UPA.'});
    }
}

export const getLastFrameByUpaDev = async (req, res) => {
  const upaId = req.params.upaId;

  try {
    const upa = await Upa.findById(upaId);
    if (!upa) {
      return res.status(404).json({ message: 'No se encontró la UPA.' });
    }

    const lastFrame = await Frame.findOne({ idUPA: upa._id }).sort({ _id: -1 });

    res.status(200).json(lastFrame);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener la última trama vinculada a la UPA.'});
  }
}


export const getAllFrameByUpa = async (req, res) => {
    const upaId = req.params.upaId;
  
    try {
      const upa = await Upa.findById(upaId);
      if (!upa) {
        return res.status(404).json({ message: 'No se encontró la UPA.' });
      }
  
      const frames = await Frame.find({ idUPA: upa._id });
  
      res.status(200).json(frames);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al obtener todas las tramas vinculadas a la UPA.'});
    }
}

export const updateData = async (req, res, next) => {
    
    try {
        const lastFrame = await Frame.findOne().sort({ $natural: -1 }); // buscar el último registro
        const updatedFrame = await Frame.findByIdAndUpdate(lastFrame._id, req.body, { new: true }); // actualizar el registro encontrado con los datos del cuerpo de la solicitud
        res.json(updatedFrame);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}