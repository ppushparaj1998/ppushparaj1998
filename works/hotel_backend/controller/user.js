const User = require('../models/user');
const admin = require('./admin');

class userController {
    constructor() { }

    async register( req, res ) {
        try {
            const user = await new User(req.body).save();
            return res.status(200).json({ status: 200, success: false, message: "Registered Successfully", data: user });
        } catch (error) {
            console.log("Error @ register user: ", error.message);
            return res.status(400).send({ status: 400, success: false, message: "Register User Failed", error: error.message });
        }
    }
    
    async status(req, res) {
        try {
            const user = await User.findOne({ _id : req.params.user_id });
            if(user) {
                user.status = !user.status;
                await user.save();
                return res.status(200).json({ status: 200, success: true, message: "Status Changed Successfully", data : user });
            } else {
                return res.status(400).json({ status: 400, success: false, message: "User Not Found"});
            }
        } catch (error) {
            console.log("Error @ status : ", error.message);
            return res.status(400).send({ status: 400, success: false, message: "Failed to Change Status"});
        }
    }

    async login(req, res) {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            if(user) {
                const token = await user.generateAuthToken();
                return res.cookie('hostelusertoken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false }).json({ status: true, data: user, message: "Login Successfull" });
            } else {
                return res.status(200).send({ status: 401, success: false, message: "Invalid Credentials" });
            }
        } catch (error) {
            console.log("Error @ Login : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Login Failed"});
        }
    }

    async get(req, res) {
        try {
            
        } catch (error) {
            
        }
    }

}

module.exports = new userController();