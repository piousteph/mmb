const dotenv = require('dotenv')
dotenv.config()

const env = process.env.NODE_ENV || 'dev'

const dev = {
    database: {
        client: 'mysql',
        connection: {
            host: '192.168.1.4',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: false
        },
        pool: {
            min: 0,
            max: 7
        }
    },
    port: 3080,
    log: {
        enable: true
    },
    SecretOrKey: process.env.SECRET_OR_KEY
}

const prod = {
    database: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: false
        },
        pool: {
            min: 0,
            max: 7
        }
    },
    port: 3080,
    log: {
        enable: true
    },
    SecretOrKey: process.env.SECRET_OR_KEY
}

const config = {
    dev,
    prod
}

module.exports = config[env]
