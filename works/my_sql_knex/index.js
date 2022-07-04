require('dotenv').config({ path: __dirname + '/config/.env' })
const express = require('express');
const cookieParser = require('cookie-parser')
const adminRouter = require('./router/admin')
const workerRouter = require('./router/worker')
const attendanceRouter = require('./router/attendance')


const app = express();
app.use(cookieParser())
app.use(express.json());


app.use(adminRouter);
app.use(workerRouter);
app.use(attendanceRouter);

const port = 4005 || process.env.PORT

app.listen(port, () => {
    console.log("Attendence application running on : ", process.env.PORT )
});
