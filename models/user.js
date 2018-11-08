const db = require('../modules/common/database')

const User = db.Model.extend({
    tableName: 'login_user',
    hasSecurePassword: true
})

module.exports = User
