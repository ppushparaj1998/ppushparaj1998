const express = require('express');
const router = express.Router();

const PayslipController = require('../controller/payslip');
const payslipController = new PayslipController();

router.post('/payslip/create', payslipController.create);
router.post('/payslip/update/:id', payslipController.update);
router.get('/payslip/get/:id', payslipController.get);
router.get('/payslip/getAll', payslipController.getAll);
router.delete('/payslip/delete/:id', payslipController.delete);
router.get('/payslip/inner/join', payslipController.innerJoin);
router.get('/payslip/left/join', payslipController.leftJoin);
router.get('/payslip/right/join', payslipController.rightJoin);

module.exports = router;