const router = require('express').Router();
const admin = require('../controller/admin');
const adminController = require('../controller/admin');
const adminAuth = require('../middleware/adminauth');

router.post('/admin/register', adminController.register);
router.post('/admin/login', adminController.login);
router.get('/admin/get', adminAuth, adminController.get)
router.get('/admin/status', adminAuth, adminController.status);












module.exports = router;