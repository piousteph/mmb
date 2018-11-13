const db = require('../modules/common/database')

const Profile = db.Model.extend({
    tableName: 'mmb_profile'
})

module.exports = Profile
