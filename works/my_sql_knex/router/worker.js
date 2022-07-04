const router = require('express').Router();
const workerAuth = require('../middleware/workerauth');

const workerController = require('../controller/worker')


router.post('/worker/register', workerController.create);
router.post('/worker/login', workerController.login);
router.get('/worker/get', workerAuth, workerController.get);
router.get('/worker/logout', workerAuth, workerController.logout);
module.exports = router;