const semver = require('semver');

class ServiceRegistry {
    constructor() { 
        this.services = {};
        this.timeout = 30;
    }

    async get(name, version) {
        this.cleanup();
        const candidates = Object.values(this.services)
        .filter(service => service.name === name && semver.satisfies(service.version, '1.0.0'));
        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    async register(name, version, ip, port) {
        this.cleanup();
        const key = name + version + ip + port;
        // console.log("Key-------------------->", key)
        if(!this.services[key]) {
            this.services[key] = {};
            this.services[key].timestamp = Math.floor(new Date() / 1000);
            this.services[key].ip = ip;
            this.services[key].port = port;
            this.services[key].name = name;
            this.services[key].version = version;
            console.log(`Added Service ${name}, version ${version} at ${ip}: ${port}`);
            return key;
        }
    }

    async unregister(name, version, ip, port) {
        const key = name + version + ip + port;
        delete this.services[key];
        return key;
    }

    async cleanup() {
        const now = Math.floor(new Date()/1000);
        Object.keys(this.services).forEach(key => {
            if(this.services[key].timestamp + this.timeout < now) {
                delete this.services[key];
                console.log(`Removed Service ${key}`);
            }
        })
    }

}

module.exports = new ServiceRegistry;