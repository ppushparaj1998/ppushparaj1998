const Admin = require('../models/admin');

class AdminController {
    constructor() {} 

    async register(req, res) {
        try {
            const admin = await new Admin(req.body);
            return res.status(200).json({ status: 200, success: true, message: "Admin Created Successfully", data: admin });
        } catch (error) {
            console.log("Error @ register : ", error);
            return res.status(400).send({ status: 400, success: false, message:  "Failed to register admin", error: error.message });
        }
    }

    async get(req, res) {
        try {
            const admin = await Admin.findOne({_id: req.params.id});
            return res.status(200).json({ status: 200, success: true, message: "Admin Fetched Successfully", data: admin });
        } catch (error) {
            console.log("Error @ getAdmin : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Failed to fetch the Admin", error: error.message });
        }
    }
}

module.exports = new AdminController;