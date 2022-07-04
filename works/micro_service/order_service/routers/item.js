const router = require('express').Router();

const foodController = require('../controllers/item');

router.post('/food/item/create', foodController.create);

module.exports = router;