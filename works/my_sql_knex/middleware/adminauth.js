const jwt = require('jsonwebtoken');
const DB = require('../config/db');

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.AdminToken;
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        const admin = await DB('admin').where({ id: decode.id, status: true}).first();
        if(!admin) {
            throw new Error('Invalid Credentials')
        }
        req.token = token
        req.admin = admin
        if(req.params.worker_id) {
            const worker = await DB('worker').where({ id : req.params.worker_id}).first();
            if(!worker) {
                return res.status(200).send({ status: 200, success: false, message: "Worker Not Found"});
            }
            req.worker = worker;
            worker.id = worker.worker.id;
        }
        next()
    } catch (error) {
        console.log("Error @ auth : ", error)
        res.status(401).send({ status: 401, success: false, message: "Loogged Out Kindly Login"})
    }
}

module.exports = auth