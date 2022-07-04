const router = require('express').Router();
const foodItemController = require('../controllers/food_item');

router.post('/food/item/create', foodItemController.createFoodItem);

module.exports = router;