const Item = require('../models/item');

class ItemController{
    constructor() { } 
    async create(req, res) {
        try {
            console.log("req.body------------------------->", req.body)
            const foodItem = await new Item(req.body);
            await foodItem.save();
            return res.status(200).json({ status: 200, sucess: true, message: "Food Item created Successfully ", data: foodItem });
        } catch (error) {
            console.log("Error @ create food item : ", error);
            return res.status(400).send({ status: 400, sucess: false, message: "Failed to create to food item", error: error.message });
        }
    }
}

module.exports = new ItemController;