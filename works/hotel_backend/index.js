require('dotenv').config({path : __dirname + '/config/.env' })
const express = require('express');
const cookie = require('cookie-parser');

require('./config/db');

const app = express();
app.use(express.json());
app.use(cookie(process.env.COOKIE_SECRET));

const adminRouter = require('./router/admin');
const userRouter = require('./router/user');

app.use(adminRouter);
app.use(userRouter);

const port = 4007
app.listen(port, () => {
    console.log("Hotel running on port : ", process.env.PORT)
})