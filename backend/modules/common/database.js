const config = require('./config')
const db = require('knex')(config.database)

module.exports = db
