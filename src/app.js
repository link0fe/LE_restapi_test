const express = require('express');
const axios = require('axios');
const app = express();
const routes = require('./routes/index');
const { serveSwaggerUI, setupSwaggerUI } = require('./config/service.config');



app.use(express.json()); 
app.use('/api', routes); 


// swagger
app.use('/api-docs', serveSwaggerUI, setupSwaggerUI);

module.exports = app;