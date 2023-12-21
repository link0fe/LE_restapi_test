require('dotenv').config();

const app = require('./app');

const host = process.env.HOST || 'http://localhost:3000/';
const port = process.env.PORT || '3000';

app.listen(port, () => {
    console.log(`Example app listenning at ${host}`)
})
