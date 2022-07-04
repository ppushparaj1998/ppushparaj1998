require('dotenv').config({ path : __dirname + '/config/.env'});
const express = require('express');
const app = express();
const axios = require('axios');
const http = require('http');

require('./config/db');

const server = http.createServer(app);
const { connectRabbitMQ } = require("./services/rabbitMQ");
const pjs = require('./package.json');
const { name, version } = pjs;
connectRabbitMQ();

server.listen(0);

app.use(express.json());
app.use(require('./routers/item'))

server.on('listening', () => {
    const registerService =  () => axios.put(`http://${process.env.SERVICE_PORT}`+`/register/${name}/${version}/${server.address().port}`);
    // console.log("registerService---------------------------->", registerService())
    const unregisterService = ()  =>  axios.delete(`http://${process.env.SERVICE_PORT}`);
    registerService();

    const interval = setInterval(registerService, 20000);
    const cleanup = async() => {
        clearImmediate(interval);
        await unregisterService();
    }

    process.on('uncaughtException', async() => {
        await cleanup();
        process.exit(0);
    });

    process.on('SIGINT', async() => {
        await cleanup();
        process.exit(0);
    })

    process.on('SIGINT', async() => {
        await cleanup();
        process.exit(0);
    })

    process.on('SIGTERM', async() => {
        await cleanup();
        process.exit(0);
    })

    console.log(`Hi there, Iam Listening on port ${server.address().port}`);
})