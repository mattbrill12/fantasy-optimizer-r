const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const axios = require('axios');

// TODO setup a config file
////////////////////////////
const apiPort = '6213';
////////////////////////////
const baseUrl = `http://localhost:${apiPort}`;
app.use(express.json());
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

app.post('/optimized-lineup/:type', async (req, res) => {
    console.log(req.body)
    const resp = await axios.post(`${baseUrl}/optimized-lineup/${req.params.type}`, req.body);
    res.send(JSON.parse(resp.data))
});

app.get('/generated-lineup/:type', async (req, res) => {
    let url = `${baseUrl}/generated-lineup/${req.params.type}`;
    if (req.query.numTrials) url = `${url}?numTrials=${req.query.numTrials}`
    const resp = await axios.get(url);
    res.send(JSON.parse(resp.data))
});

app.listen(port, () => {
    console.log(`proxy app listening at http://localhost:${port}`)
});