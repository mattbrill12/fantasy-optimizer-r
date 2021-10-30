const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const axios = require('axios');

const apiPort = '7501'
const baseUrl = `http://localhost:${apiPort}`;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/draftables', async (req, res) => {
    const resp = await axios.get(`${baseUrl}/draftables`);
    res.send(JSON.parse(resp.data)); // convert stringified object to JSON 
});

app.get('/optimized-lineup', async (req, res) => {
    const resp = await axios.get(`${baseUrl}/optimized-lineup`);
    res.send(JSON.parse(resp.data))
});

app.get('/generated-lineup', async (req, res) => {
    const resp = await axios.get(`${baseUrl}/generated-lineup`);
    res.send(JSON.parse(resp.data))
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});