const DB = require('../config/db')


class DataController {
    
    constructor() { }

    async create(req, res) {
        try {
            let user = await DB('user').insert(req.body);
            return res.status(200).json({ success: true, status: 200, message: "Data insterted successfully", data: user })
        } catch (error) {
            console.log("Error:", error)
            return res.status(400).send({ success: false, status: 400, message: "Failed to create data", error: error.message })
        }
    }

    async update(req, res) {
        try {
            let update_user = await DB('user').where({ 'id' : req.params.id }).update({ age: req.body.age });
            return res.status(200).json({ success: true, status: 200, message: "User updated successfully", data: update_user });
        } catch (error) {
            console.log("Error: ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to update User", error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            let users = await DB('user').select().table('user');
            return res.status(200).json({ success: true, status: 200, message: "User Fetched Successfully", data: users });
        } catch (error) {
            console.log("Error: ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to fetch the users", error: error.message });
        }
    }

    async get(req, res) {
        try {
            let user = await DB('user').select().where({ id: req.params.id })
            return res.status(200).json({ success: true, status: 200, message: "User Fetched Successfully", data: user });
        } catch (error) {
            console.log("Error: ", error);
            return res.status(400).send({ success: false,})
        }
    }

    async delete(req, res) {
        try {
            let del_user = await DB('user').where({ id : req.params.id}).del();
            return res.status(200).json({ success: true, status: 200, message: "The user deleted successfully", data: del_user });
        } catch (error) {
            console.log("Error: ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to delete the user" , error: error.message });
        }
    }

}

module.exports = DataController;