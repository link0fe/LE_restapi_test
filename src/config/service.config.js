const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'LE test task',
    version: '1.0.0',
    description: 'Position: node.js developer',
  },
  servers: [
    {
      url: `${process.env.HOST}` || 'http://localhost:3000',
    },
  ],
};

// Options for the swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: [
    './src/services/*.schema.yaml'
  ]
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Middleware function to serve the Swagger UI
const serveSwaggerUI = swaggerUi.serve;
const setupSwaggerUI = swaggerUi.setup(swaggerSpec);

module.exports = {
  serveSwaggerUI,
  setupSwaggerUI,
};