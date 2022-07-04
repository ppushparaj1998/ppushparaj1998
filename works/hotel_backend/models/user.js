const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../controller/admin');

const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile_no: {
        type: Number,
        required: true
    },
    city: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }

},{ timestamps : true });

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = await jwt.sign({ _id: admin._id.toStrring() }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    if(!user) {
        throw new Error('Invalid Credentials')
    }
    if(user.status == false) {
        throw new Error('Access Denied')
    }
    const check = await bcrypt.compare(password, user.password)
    if(!check) {
        throw new Error('Invalid Credentials')
    }
    return user
}

userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
})

const User = mongoose.model("user", userSchema);

module.exports = User;