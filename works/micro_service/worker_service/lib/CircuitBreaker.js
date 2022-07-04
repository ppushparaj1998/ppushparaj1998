const axios = require('axios');

class CircuitBreaker {
    constructor() {
        this.states = {};
        this.failureThreshold = 5;
        this.cooldownPeriod = 10;
        this.requestTimeout = 1;
    }

    async callService(requestOptions) {
        const endpoint = `${requestOptions.method}:${requestOptions.url}`;
        console.log('in circuit breaker call service-------------------------------->' + endpoint)

        if (!this.canRequest(endpoint)) return false;
        //console.log("can request",this.canRequest(endpoint))
        requestOptions.timeout = 0;
        //console.log("request options timeout", requestOptions.timeout)

        try {
            const response = await axios(requestOptions);
            console.log('in circuit breaker call service function' + response)
            this.onSuccess(endpoint);
            //console.log("response.data", response.data)
            return response.data;
        } catch (err) {
            this.onFailure(endpoint);
            // return false;
            // console.log("onFailure--------->", err);
            // if(err.message){
            //     let str = err.message;
            //     let msg = str.split(' ');
            //     if(msg[1] && msg[0] === 'connect' && msg[1] === 'ECONNREFUSED'){
            //         console.log(msg[2]);
            //     }
            // }
            let res = { success: false, message: 'Something Went Wrong !', error: err.message }
            return res;
        }
    }

    onSuccess(endpoint) {
        this.initState(endpoint);
    }

    onFailure(endpoint) {
        //console.log("on failure endpoint ", endpoint )
        const state = this.states[endpoint];
        //console.log("state in on failure", state)
        state.failures += 1;
        if (state.failures > this.failureThreshold) {
            state.circuit = 'OPEN';
            state.nextTry = new Date() / 1000 + this.cooldownPeriod;
            //console.log('state.nextTry', state.nextTry)
            console.log(`ALERT! Circuit for ${endpoint} is in state 'OPEN'`);
        }
    }

    canRequest(endpoint) {
        //console.log("endpoint in can request",endpoint)
        if (!this.states[endpoint]) this.initState(endpoint);
        //console.log("can request function",this.states[endpoint])
        const state = this.states[endpoint];
        if (state.circuit === 'CLOSED') return true;
        console.log("new date", new Date())
        const now = new Date() / 1000;
        console.log("now time", now)
        if (state.nextTry <= now) {
            state.circuit = 'HALF';
            return true;
        }
        return false;
    }

    initState(endpoint) {
       // console.log("endpoint in init state", endpoint)
        this.states[endpoint] = {
            failures: 0,
            cooldownPeriod: this.cooldownPeriod,
            circuit: 'CLOSED',
            nextTry: 0,
        };
        //console.log("init state function", this.states[endpoint])
    }
}

module.exports = CircuitBreaker;