const express = require('express');
const app = express();

const PORT = 3005;
const serviceRouter = require('./router/router');

app.use(express.json());
app.use(serviceRouter);

app.listen(PORT, () => {
    console.log("Server running on that Port ", PORT)
})

