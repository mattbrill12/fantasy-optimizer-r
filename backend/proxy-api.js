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

app.get('/positions', async (req, res) => {
    const resp = await axios.get(`${baseUrl}/positions`);
    res.send(resp.data);
});

app.get('/optimized-lineup/:type', async (req, res) => {
    const resp = await axios.get(`${baseUrl}/optimized-lineup/${req.params.type}`);
    res.send(JSON.parse(resp.data))
});

app.get('/generated-lineup/:type', async (req, res) => {
    let url = `${baseUrl}/generated-lineup/${req.params.type}`;
    if (req.query.numTrials) url = `${url}?numTrials=${req.query.numTrials}`

    console.log(url)
    const resp = await axios.get(url);
    res.send(JSON.parse(resp.data))
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});