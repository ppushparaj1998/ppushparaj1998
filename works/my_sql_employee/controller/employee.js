const DB = require('../config/db')

class DataController {

    constructor() {  }

    async create(req, res) {
        try {
            let employee = await DB('employee_data').insert(req.body);
            return res.status(200).json({ success: true, status: 200, message: "Employee Created Successfully", data: employee });
        } catch (error) {
            console.log("Error: ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to create Employee", error: error.message });
        }
    }

    async update(req, res) {
        try{
            let update_emp = await DB('employee_data').where({ 'id' : req.params.id }).update({ Experience: req.body.Experience });
            return res.status(200).json({ success: true, status: 200, message: "Employee Updated Successfully", data: update_emp });
        } catch (error) {
            console.log("Error: ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to Update Employee", error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            let employees = await DB('employee_data').select().table('employee_data');
            return res.status(200).json({ success: true, status: 200, message: "Employees Fetched Successfully", data: employees });
        } catch (error) {
            console.log("Error : ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to fetch the employees" });
        }
    }

    async get(req, res) {
        try {
            let employee = await DB('employee_data').select().where({ id: req.params.id });
            return res.status(200).json({ success: true, status: 200, message: "Employee Fetched Successfully", data: employee });
        } catch (error) {
            console.log("Error : ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to fetch the employees" });
        }
    }

    async delete(req, res) {
        try {
            let del_emp = await DB('employee_data').where({ id: req.params.id }).del();
            return res.status(200).json({ success: true, status: 200, message: "Employee Deleted successfully", data: del_emp });
        } catch (error) {
            console.log("Error : ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to delete the employee", error: error.message });
        }
    }

}

module.exports = DataController;