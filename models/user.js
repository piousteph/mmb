const db = require('../modules/common/database')
const Profile = require('./profile')

const User = db.Model.extend({
    tableName: 'mmb_user',
    hasSecurePassword: true,
    profile: function() {
        return this.hasOne(Profile, 'id', 'id_profile');
    }
})

module.exports = User
