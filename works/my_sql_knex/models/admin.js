const jwt = require('jsonwebtoken')

const Admin = {
    generateAuthToken: async function(admin) {
        try {
            const token = await jwt.sign({ id: admin.id.toString() }, process.env.JWT_SECRET, {
                expiresIn: '12h'
            })
            return token
        } catch (error) {
            console.log("Error @ encrypt : ", error)
            return false;
        }
    }
}

module.exports = Admin