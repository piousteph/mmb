const express = require('express')
const router = express.Router()
const db = require('../modules/common/database')
const passport = require('../modules/common/passport')

/* GET /shelf */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => { 
    db.select(['usid', 'shelf', 'icon'])
        .from('mmb_shelf')
        .leftJoin('mmb_user_shelf', 'id_shelf', 'usid')
        .where('mmb_user_shelf.id_user', req.user.uuid)
        .then((data) => {
        res.status(200).json({ 
            error: false,
            rows: data
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({
            error: true,
            message: 'Fatal Error'
        })
    })
})

/* GET /shelf/:shelfid */
router.get('/:shelfid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* POST /shelf */
router.post('/', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* PUT /shelf/:shelfid */
router.put('/:shelfid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* DELETE /shelf/:shelfid */
router.delete('/:shelfid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

module.exports = router