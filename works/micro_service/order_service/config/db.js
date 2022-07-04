const mongoose = require('mongoose');

mongoose.connect(process.env.URL, { useNewUrlParser : true });
const con = mongoose.connection;

con.on('connected', () => {
    console.log("MongoDB Connection in open")
})