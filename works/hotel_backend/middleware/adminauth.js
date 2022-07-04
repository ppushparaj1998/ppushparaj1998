const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');
const User = require('../models/user');

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.hoteladmintoken
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findOne({ _id: decode._id, status: true}).select('+password');
        if(!admin) {
            throw new Error('Invalid Credentials')                       
        }
        req.token = token;
        req.admin = admin;
        if(req.params.user_id) {
            const user = await User.findOne({ _id : req.params.user_id });
            if(user) {
                req.user = user
            } else {
                return res.status(400).send({ status: 404, success: false, message: "User Not Found" })
            }
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({ status: 400, success: false, message: "Logged out kindly Login" })
    }
}

module.exports = auth