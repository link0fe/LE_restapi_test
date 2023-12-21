const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req.query);
    res.status(200).json("Server Works 123")
})

module.exports = app;