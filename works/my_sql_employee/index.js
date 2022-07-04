const express = require('express');

const app = express();
const employeeRouter = require('./router/employee');
const payslipRouter = require('./router/payslip');

app.use(express.json());
app.use(employeeRouter);
app.use(payslipRouter);

app.listen(3003, () => console.log("Server running on the port 3003"));