const express = require('express');
const app = express();
const excelRouter = require('./routers/excel')

app.use(express.json())
app.use(excelRouter);

app.listen(4007, ()=> {
    console.log("Excel file function Running on: localhost 4006")
})