const express = require('express');
const router = express.Router();

const DataController = require('../controller/user')
const dataController = new DataController();

router.post('/user/create', dataController.create);
router.post('/user/update/:id', dataController.update);
router.get('/user/getAll', dataController.getAll);
router.get('/user/get/:id', dataController.get);
router.delete('/user/delete/:id', dataController.delete);

module.exports = router;