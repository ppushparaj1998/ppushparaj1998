const router = require('express').Router();
const workerAuth = require('../middleware/workerauth');

const attendanceController = require('../controller/attendance');

router.get('/attendance/present', workerAuth, attendanceController.present);

module.exports = router;