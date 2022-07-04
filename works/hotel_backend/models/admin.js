const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        default: 'admin'
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps : true });

adminSchema.methods.generateAuthToken = async function () {
    const admin = this
    const token = await jwt.sign({ _id: admin._id.toString() }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
    return token;
}

adminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({ email }).select('+password');
    if(!admin) {
        throw new Error('Invalid Credentials')
    }
    if(admin.status == false) {
        throw new Error('Access Denied')
    }
    const check = await bcrypt.compare(password, admin.password)
    if(!check) {
        throw new Error('Invalid Credentials')
    }
    return admin
}

adminSchema.pre('save', async function(next) {
    const admin = this
    if(admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    
})

var Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;