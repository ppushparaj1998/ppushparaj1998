const serviceCallAPI = require('../food_item_service');

class FoodItemController {
    constructor() { }
    
    async createFoodItem(req, res) {
        let response = await serviceCallAPI.createItem(req.body);
        // console.log("Response------------------------------------------------>", response)
        res.status(200).send(response);
       }
}

module.exports = new FoodItemController;