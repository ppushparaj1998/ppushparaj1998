const jwt = require('jsonwebtoken');
const DB = require('../config/db');

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.WorkerToken;
        const decode = await jwt.verify(token, process.env.WORKER_JWT_SECRET);
        const worker = await DB('worker').where({ id: decode.id, status: true}).first();
        if(!worker) {
            throw new Error('Invalid Credentials')
        }
        req.worker = worker;
        next()
    } catch (error) {
        console.log("Error @ auth : ", error)
        res.status(401).send({ status: 401, success: false, message: "Loged Out Kindly Login"})
    }
}

module.exports = auth