const db = require('../modules/common/database')

const Shelf = db.Model.extend({
    tableName: 'mmb_shelf'
})

module.exports = Shelf