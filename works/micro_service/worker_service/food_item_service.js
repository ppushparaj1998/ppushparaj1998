const axios = require('axios');
let url = require('url');
const crypto = require('crypto');
const CircuitBreaker = require('./lib/CircuitBreaker');

const circuitBreaker = new CircuitBreaker();
class OrderApiService {
    constructor() {
        this.cache = {}
    }

    async createItem(bodyParam) {
        console.log("create Item ------------------------>")
        const {ip , port} = await this.getService(process.env.FOOD)
            return this.callService({
            method: 'post',
            url: `http://${ip}:${port}/food/item/create`,
            data: bodyParam,
            })
    }

    async getService(servicename) {
        try {
            console.log("Service Name", servicename, `http://`+process.env.SERVICE_PORT + `/find/${servicename}/1`)
            const response = await axios.get(`http://`+process.env.SERVICE_PORT + `/find/${servicename}/1`);
            console.log("response.data------------------------->", response)
            return response.data;
        } catch (error) {
            console.log("Error : ", error)
        }
    }

    async callService(requestOptions) {

        const servicePath = url.parse(requestOptions.url).path;
        const cacheKey = crypto.createHash('md5').update(requestOptions.method + servicePath).digest('hex');
        console.log("requestOptions------------------------------->", requestOptions)
        const result = await circuitBreaker.callService(requestOptions);
        console.log("result----------------------------------------------->", result)
        if (!result) {
            if (this.cache[cacheKey]) return this.cache[cacheKey];
            return false;
        }

        this.cache[cacheKey] = result;
        return result;
    }

}

module.exports = new OrderApiService;
