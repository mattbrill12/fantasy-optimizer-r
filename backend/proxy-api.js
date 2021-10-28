const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const axios = require('axios');

const apiPort = '7980'
const baseUrl = `http://localhost:${apiPort}`;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/season', async (req, res) => {
    const resp = await axios.get(`${baseUrl}/season`);
    res.send(JSON.parse(resp.data)); // convert stringified object to JSON 
})

app.get('/team/:id', async (req, res) => {
    const resp = await axios.get(`${baseUrl}/team/${req.params.id}`);
    console.log(resp)
    res.send(resp.data[0])
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})