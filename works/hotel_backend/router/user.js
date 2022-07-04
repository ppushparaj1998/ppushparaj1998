const router = require('express').Router();
const adminAuth = require('../middleware/adminauth');

const userController = require('../controller/user');

//user api's
router.post('/user/register', userController.register);


//admin api's
router.get('/admin/user/status/:user_id', adminAuth, userController.status)

module.exports = router;