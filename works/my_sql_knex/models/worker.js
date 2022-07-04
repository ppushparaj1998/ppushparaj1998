const jwt = require('jsonwebtoken')

const Worker = {
    generateAuthToken: async function(worker) {
        try {
            const token = await jwt.sign({ id: worker.id.toString() }, process.env.WORKER_JWT_SECRET, {
                expiresIn: '12h'
            })
            return token
        } catch (error) {
            console.log("Error @ encrypt : ", error)
            return false;
        }
    }
}

module.exports = Worker