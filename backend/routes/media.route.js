const express = require('express')
const router = express.Router()
const db = require('../modules/common/database')
const validator = require('../modules/common/validator')
const passport = require('../modules/common/passport')


/* GET /media/:shelfid */
router.get('/:shelfid', passport.authenticate('jwt', {
    session: false
}), validator(), (req, res) => {
    db.select(['shelf_id'])
        .from('mmb_shelf')
        .where('id_user', req.user.user_id)
        .andWhere('shelf_id', req.params.shelfid)
        .then((data) => {
            if (data.length === 1) {
                db.select()
                    .from('mmb_media')
                    .where('id_shelf', req.params.shelfid)
                    .then(medias => {
                        res.status(200).json({
                            error: false,
                            rows: medias
                        })
                    })
            } else {
                res.status(403).json({
                    error: true,
                    message: 'Forbbiden'
                })
            }
        }).catch((err) => {
            console.log(err)
            res.status(500).json({
                error: true,
                message: 'Fatal Error'
            })
        })
})

/* GET /media/:shelfid/:mediaid */
router.get('/:shelfid/:mediaid', passport.authenticate('jwt', {
    session: false
}), validator(), (req, res) => {

})

/* POST /media/:shelfid */
router.post('/:shelfid', passport.authenticate('jwt', {
    session: false
}), validator(), (req, res) => {

})

/* PUT /media/:shelfid/:mediaid */
router.put('/:shelfid/:mediaid', passport.authenticate('jwt', {
    session: false
}), validator(), (req, res) => {

})

/* DELETE /media/:shelfid/:mediaid */
router.delete('/:shelfid/:mediaid', passport.authenticate('jwt', {
    session: false
}), validator(), (req, res) => {

})

/* POST /media/:shelfid/:mediaid/lending */
router.post('/:shelfid/:mediaid/lending', passport.authenticate('jwt', {
    session: false
}), validator(), (req, res) => {

})

module.exports = router