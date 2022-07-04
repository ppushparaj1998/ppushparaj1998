const DB = require('../config/db');

class AttendanceController {
    constructor() { }

    async present(req, res) {
        try {
            const worker = req.worker
            const present = (new Date().toISOString()).slice(0,10)
            const data = {}
            data.worker_id = worker.id;
            data.name = worker.name;
            data.email = worker.email;
            data.date = present;
            data.present = true;
            const prevData = await DB('attendance').select('*').where('date', '<', present ) 
            if(prevData[0]){
                const attendance = await DB('attendance').insert(data);
                return res.status(200).send({ status: 200, success: true, message: "Present Successfully", data: attendance });
            } else {
                return res.status(200).send({ status: 400, success: false, message: "Already you make an Present Attendance" });
            }
        } catch (error) {
            console.log("Error @ present attendance : ", error.message);
            return res.status(400).send({ status: 400, success: false, message: "Failed to make present Attendance" });
        }
    }

    async absent(req, res) {
        try {
            const worker = req.worker
            const present = (new Date().toISOString()).slice(0,10)
            const data = {}
            data.worker_id = worker.id;
            data.name = worker.name;
            data.email = worker.email;
            data.date = present;
            data.present = false;
            const prevData = await DB('attendance').select('*').where('date', '<', present ) 
            if(prevData[0]){
                const attendance = await DB('attendance').insert(data);
                return res.status(200).send({ status: 200, success: true, message: "Absent Successfully", data: attendance });
            } else {
                return res.status(200).send({ status: 400, success: false, message: "Already you make an Absent Attendance" });
            }
        } catch (error) {
            console.log("Error @ absent : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Failed to make an Absent Attendence"});
        }
    }

}

module.exports = new AttendanceController();