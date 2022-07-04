const DB = require('../config/db')
const bcrypt = require('bcryptjs')
const AdminModel = require('../models/admin')

class AdminController {
    constructor () { }

    async create(req, res) {
        try {
            if(req.body.password == req.body.confirm_password) {
                req.body.password = await bcrypt.hash(req.body.password, 8)
                let admin = await DB('admin').insert({email : req.body.email, name: req.body.name, password: req.body.password })
                return res.status(200).json({ success: true, status: 200, message: "Admin Created Successfully", data : admin });
            } else {
                return res.status(200).send({ status: 400, success: false, message: "Password Mismatched"})
            }
        } catch (error) {
            console.log("Error: @createAdmin", error)
            res.status(400).send({status: 400, success: false, message: "Failed to create admin", error: error.message });
        }
    }

    async login(req, res) {
        try {
            const admin = await DB('admin').where({ email: req.body.email }).first();
            if(admin) {
                const check_pass = await bcrypt.compare(req.body.password, admin.password);
                if(check_pass) {
                    const token = await AdminModel.generateAuthToken(admin)
                    return res.cookie('AdminToken', token, { maxAge: 1000 * 60 * 60 * 24 * 1, httpOnly: false }).json({ status: 200, success: true, data: admin, message: "Login Successfully"})
                } else {
                    return res.status(200).send({ status: 400, success: false, message: "Invalid Password"})
                }
            } else {
                return res.status(200).send({ status: 400, success: false, message: "Invalid Email"})
            }
        } catch (error) {
            console.log("Error @login : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Login Failed"})
        }
    }
    async update(req, res) {
        try {
            let update_admin = await DB('admin').where({ id: req.admin.id }).update(req.body);
            return res.status(200).json({ success: true, status:200, message: "Admin Updated Successfully", data: update_admin})
        } catch (error) {
            console.log("Error @ updateAdmin: ", error.message)
            res.status(400).send({status: 400, success: false, message: "Failed to update admin", error: error.message });
        }
    }

    async get(req, res) {
        try {
            const admin = await DB('admin').where({ id: req.admin.id });
            return res.status(200).json({ success: true, status: 200, message: "Admin Details Fetched Successfully", data: admin });
        } catch (error) {
            console.log("Error @ get admin: ", error.message);
            res.status(400).send({ status: 400, success: false, message: "Failed to fetch admin Details", error: error.message });
        }
    }

    async changeStatus(req, res) {
        try {
            const admin = await DB('admin').where({ id: req.admin.id }).update({ status: req.body.status });
            return res.status(200).json({ success: true, status: 200, message: "status changed successfully", data: admin });
        } catch (error) {
            console.log("Error @ changeStatus : ", error.message);
            res.status(400).send({ status: 400, success: false, message: "Failed to change status", error: error.message });
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('AdminToken');
            res.status(200).send({ status: 200, success: true, message: "Logout Successfull" });
        } catch (error) {
            console.log("Error @ logout: ", error);
            res.status(400).send({ status: 400, success: false, message: "Logout Failed", error: error.message })
        }
    }
}

module.exports = AdminController;