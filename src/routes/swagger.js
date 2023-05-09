const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Backend Fishweb',
        version: '1.0.0',
        description: 'Documentación del backend para el proyecto Fishweb'
      },
      servers: [
        {
          url: 'http://localhost:3000/api'
        }
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    // Rutas de archivos con rutas y configuraciones de Swagger
    apis: [
      './src/routes/*.js'
    ]
  };


const swaggerSpec = swaggerJSdoc(options);

const swaggerDocs = (app, port) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

console.log("📕 Arriba");

module.exports = {swaggerDocs};