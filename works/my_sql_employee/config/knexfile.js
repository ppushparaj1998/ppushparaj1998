module.exports = {
    development: {
        client: 'mysql',
        connection : {
            host : '127.0.0.1',
            port : 3306,
            user : 'root',
            password : 'password',
            database : 'employee'
        },
        pool: { min: 0, max: 7 }
    }
}