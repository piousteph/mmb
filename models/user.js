const db = require('../modules/common/database')

const User = db.Model.extend({
    tableName: 'mmb_user',
    hasSecurePassword: true
})

module.exports = User
