const express = require('express')
const router = express.Router()
const db = require('../modules/common/database')
const passport = require('../modules/common/passport')

/* GET /shelf */
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log('USER', req.user)

    db.select(['shelf_id', 'shelf', 'icon'])
        .from('mmb_shelf')
        .where('id_user', req.user.user_id)
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
router.get('/:shelfid', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    db.select(['media_id', 'name', 'icon'])
        .from('mmb_media')
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

/* POST /shelf */
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const newValues = {
        shelf: req.body.shelf,
        icon: '',
        id_user: req.user.user_id
    }
    db.table('mmb_shelf').insert(newValues).then(data => {
        res.status(201).json({
            error: false,
            shelf_id: data[0],
            message: 'Shelf successfully added'
        })
    }).catch(err => {
        console.log('RATE', err)
        res.status(500).json({
            error: true,
            message: 'Shelf not added'
        })
    })
})

/* PUT /shelf/:shelfid */
router.put('/:shelfid', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    if (req.body.user_id === req.user.user_id) {
        const newValues = {
            shelf: req.body.shelf,
            icon: req.body.icon
        }
        db.table('mmb_shelf').update(newValues).where('shelf_id', +req.params.shelfid).then(data => {
            res.status(200).json({
                error: false,
                message: 'User successfully updated'
            })
        }).catch(err => {
            console.log('RATE', err)
            res.status(500).json({
                error: true,
                message: 'Shelf not updated'
            })
        })
    } else {
        res.status(401).json({
            error: true,
            message: 'Unthorized'
        })
    }
})

/* DELETE /shelf/:shelfid */
router.delete('/:shelfid', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

})

module.exports = router