const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    food_name: {
        type: String
    },
    description : {
        type : String
    },
    status: {
        type : Boolean,
        default : true
    }
}, { timestamps : true });

module.exports = mongoose.model('fooditem', itemSchema);
