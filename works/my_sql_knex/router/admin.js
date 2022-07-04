const router = require('express').Router();
const adminAuth = require('../middleware/adminauth');

const AdminController = require('../controller/admin');
const adminController = new AdminController();

router.post('/admin/create', adminAuth, adminController.create);
router.post('/admin/login', adminController.login);
router.put('/admin/update', adminAuth, adminController.update);
router.get('/admin/get', adminAuth, adminController.get);
router.put('/admin/change/status', adminAuth, adminController.changeStatus);
router.get('/admin/logout', adminAuth, adminController.logout)

module.exports = router;