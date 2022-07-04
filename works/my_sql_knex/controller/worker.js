const DB = require('../config/db');
const bcrypt = require('bcryptjs');
const WorkerToken = require('../models/worker');

class WorkerController {
    constructor() { }

    async create(req, res) {
        try {
            if(req.body.password == req.body.confirm_password) {
                req.body.password = await bcrypt.hash(req.body.password, 8)
                const data = {}
                data.email = req.body.email
                data.password = req.body.password
                data.experience = req.body.experience
                data.name = req.body.name
                const worker = await DB('worker').insert(data);
                return res.status(200).json({ status: 200, success: true, message: "Worker Created Successfully", data: worker })
            } else {
                return res.status(200).json({ staus: 400, success: false, message: "Password Mismatched" })
            }
        } catch (error) {   
            console.log("Error @ create worker: ", error.message)
            return res.status(400).send({ status: 400, success: false, message: "Failed to create worker", error: error.message })
        }
    }

    async login(req, res) {
        try {
            const worker = await DB('worker').where({ email: req.body.email}).first();
            if(worker) {
                const check = await bcrypt.compare(req.body.password, worker.password);
                if(check) {
                    const token = await WorkerToken.generateAuthToken(worker);
                    return res.cookie('WorkerToken', token, { maxAge: 1000 * 60 * 60 * 1 , https: false }).json({ status: 200, status: true, message: "Login Successfull"})
                } else {
                    return res.status(200).send({ status: 400, success: false, message: "Invalid Password" })
                }
            } else {
                return res.status(200).send({ status: 400, success: false, message: "Invalid Email" })
            }
        } catch (error) {
            console.log("Error @ Login : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Login Failed", error: error.message });
        }
    }

    async get(req, res) {
        try {
            const worker = await DB('worker').where({ id: req.worker.id }).first();
            if(worker) {
                return res.status(200).send({ status: 200, message: "Worker Details Fetched Successfully", data: worker });
            } else {
                return res.status(200).send({ status: 400, success: false, message: "Worker not Found"});
            }
        } catch (error) {
            console.log("Error @ get worker : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Failed to Fetch Worker"});
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('WorkerToken');
            res.status(200).send({ status: 200, success: true, message: "Logout Successfully"});
        } catch (error) {
            console.log("Error @ worker logout : ", error.message);
            return res.status(400).send({ status: 400, success: false, message: "Logout Failed", error: error.message });
        }
    }
}

module.exports = new WorkerController;