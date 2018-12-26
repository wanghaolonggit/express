
module.exports = {
    mysql: {
        dev: {
            connectionLimit : 100,
            host: '127.0.0.1',
            user: 'root',
            // password: '123456789',
            password: 'admin123',
            database: 'test',
            port: 3306
        },
        production: {
            connectionLimit : 100,
            host: '10.0.0.7',
            user: 'hr_2017',
            password: 'WgJn1YnwG2!',
            database: 'hr_ip_knowledge',
            port: 13307
        }
    }
}