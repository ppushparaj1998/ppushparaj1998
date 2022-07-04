const DB = require('../config/db');

class PayslipController {

    constructor() { }

    async create(req, res) {
        try {
            let payslip = await DB('payslips').insert(req.body);
            return res.status(200).json({ success: true, status: 200, message: "Payslip Created Successfully", data: payslip });
        } catch (error) {
            console.log("Error: ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to Create Payslip", error: error.message });
        }
    }

    async update(req, res) {
        try{
            let payslip = await DB('payslips').where({ 'id' : req.params.id }).update({ emp_id: req.body.emp_id });
            return res.status(200).json({ success: true, status: 200, message: "Payslip Updated Successfully", data: payslip });
        } catch (error) {
            console.log("Error: ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to Update Employee", error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            let payslips = await DB('payslips').select().table('payslips');
            return res.status(200).json({ success: true, status: 200, message: "Payslip Fetched Successfully", data: payslips });
        } catch (error) {
            console.log("Error : ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to fetch the Paylip" });
        }
    }

    async get(req, res) {
        try {
            let payslip = await DB('payslips').select().where({ id: req.params.id });
            return res.status(200).json({ success: true, status: 200, message: "Payslip Fetched Successfully", data: payslip });
        } catch (error) {
            console.log("Error : ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to fetch the Payslip" });
        }
    }

    async delete(req, res) {
        try {
            let del_payslip = await DB('payslips').where({ id: req.params.id }).del();
            return res.status(200).json({ success: true, status: 200, message: "Payslip Deleted successfully", data: del_payslip });
        } catch (error) {
            console.log("Error : ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to delete the Payslip", error: error.message });
        }
    }

    async innerJoin(req, res) {
        try {
            const in_join = await DB('payslips').table('payslips')
                            .innerJoin( 'employee_data', 'payslips.emp_id', '=' , 'employee_data.id' );
            return res.status(200).json({ success: true, status: 200, message: "Inner join did successfully", data: in_join });
        } catch (error) {
            console.log("Error : ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to did inner join", error: error.message });
        }
    }

    async leftJoin(req, res) {
        try {
            const left_join = await DB('payslips').table('payslips')
                            .leftJoin( 'employee_data', 'payslips.emp_id', '=' , 'employee_data.id' );
            return res.status(200).json({ success: true, status: 200, message: "Left join did successfully", data: left_join });
        } catch (error) {
            console.log("Error : ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to did Left join", error: error.message });
        }
    }

    async rightJoin(req, res) {
        try {
            const right_join = await DB('payslips').table('payslips')
                            .rightJoin( 'employee_data', 'payslips.emp_id', '=' , 'employee_data.id' );
            return res.status(200).json({ success: true, status: 200, message: "Right join did successfully", data: right_join });
        } catch (error) {
            console.log("Error : ", error);
            return res.status(400).send({ success: false, status: 400, message: "Failed to did Right join", error: error.message });
        }
    }


}

module.exports = PayslipController;