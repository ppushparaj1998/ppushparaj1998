require('dotenv').config({ path: __dirname + '/config/.env' })
const express = require('express')

const dataRouter = require('./router/user')

const app = express();

app.use(express.json());
app.use(dataRouter);

const port = process.env.PORT || 2022


app.listen(port, () => {
    console.log("Mysql Backend Running on : localhost", process.env.PORT);
})