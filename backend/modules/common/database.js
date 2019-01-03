const securePassword = require('bookshelf-secure-password')
const config = require('./config')
const knex = require('knex')(config.database)
const db = require('bookshelf')(knex)
db.plugin(securePassword)

module.exports = db
