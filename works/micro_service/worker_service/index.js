require('dotenv').config({path: __dirname + '/config/.env'});
const express = require('express');

require('./config/db');

const app = express();
const adminRouter = require('./routers/admin');
const foodItemRouter = require('./routers/item');

const { connectRabbitMQ } = require("./services/rabbitMQ");
connectRabbitMQ();

app.use(express.json());
app.use(adminRouter);
app.use(foodItemRouter)
const port = 5000;

app.listen(port, ()=> {
    console.log("Server running on the port : ", port);
})
console.log("process.env.FOOD", process.env.FOOD)