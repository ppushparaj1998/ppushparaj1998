const router = require('express').Router();
const adminController = require('../controllers/admin');

router.post('/admin/register', adminController.register);
router.get("/admin/get", adminController.get);

module.exports = router;

