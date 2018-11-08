const dotenv = require('dotenv')
dotenv.config()

const env = process.env.NODE_ENV || 'dev'

const dev = {
    database: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: false
        },
        pool: {
            min: 0,
            max: 7
        }
    },
    port: 8080,
    log: {
        enable: true
    },
    SecretOrKey: process.env.SECRET_OR_KEY
}

const prod = {
    database: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME || 'postgres',
            ssl: false
        },
        pool: {
            min: 0,
            max: 7
        }
    },
    port: 80,
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
