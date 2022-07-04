const Admin = require('../models/admin');

class AdminController {
    constructor () { }

    async register(req, res) {
        try {
            if(req.body.pass == "TOMJERRY") {
                const admin = await new Admin(req.body).save();
                return res.status(200).json({ status: 200, success: true, message: "Admin Created Successfully", data: admin });
            } else {
                return res.status(200).send({ status: 401, success: false, message: "Invalid Pass" });
            }
        } catch (error) {
            console.log("Error @ register admin : ", error.message );
            return res.status(400).send({ status: 400, success: false, message: "Failed to Register Admin", error: error.message });
        }
    }

    async login(req, res) {
        try {
            const admin = await Admin.findByCredentials(req.body.email, req.body.password);
            if(admin) {
                const token = await admin.generateAuthToken();
                return res.cookie('hoteladmintoken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false }).json({ status: 200, success: true, data: admin, message: "Login Successfull" })
            } else {
                return res.status(200).send({ status: 401, success: false, message: "Admin not Found"})
            }
        } catch (error) {
            console.log("Error @ admin login : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Login Failed", error: error.message });            
        }
    }
    async logout(req, res) {
        try {
            
        } catch (error) {
            
        }
    }

    async get(req, res) {
        try {
            const admin = await Admin.findOne({ id: req.admin._id });
            if(admin) {
                return res.status(200).json({ status: 200, success: true, message: "Details Fetched Successfully", data: admin });
            } else {
                return res.status(400).send({ status: 400, success: false, message: "Admin Not Found" });
            }
        } catch (error) {
            console.log("Error @ get Admin Details : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Failed to Fetch the Admin Details", error: error.message });
        }
    }
    
    async status(req, res) {
        try {
            const admin = await Admin.findOne({ id: req.admin._id });
            if(admin) {
                admin.status = !admin.status;
                await admin.save();
                return res.status(200).json({ status: 200, success: true, message: "status changed successfully", data: admin });
            }
        } catch (error) {
            console.log("Error @ admin status : ", error.message);
            return res.status(400).send({ status: 400, success: false, message: "Failed to Change Status", error: error.message });
        }
    }
}

module.exports = new AdminController;