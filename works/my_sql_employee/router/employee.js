const express = require('express');
const router = express.Router();

const EmployeeController = require('../controller/employee');
const employeeController = new EmployeeController();

router.post('/employee/create', employeeController.create);
router.post('/employee/update/:id', employeeController.update);
router.get('/employee/get/:id', employeeController.get);
router.get('/employee/getAll', employeeController.getAll);
router.delete('/employee/delete/:id', employeeController.delete);

module.exports = router;