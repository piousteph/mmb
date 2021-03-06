const express = require('express')
const router = express.Router()
const db = require('../modules/common/database')
const validator = require('../modules/common/validator')
const passport = require('../modules/common/passport')

/* GET /shelf */
router.get('/', passport.authenticate('jwt', { session: false }), validator(), (req, res) => {
    db.select(['shelf_id', 'shelf', 'provider', 'icon'])
        .from('mmb_shelf')
        .where('id_user', req.user.user_id)
        .then((data) => {
            res.status(200).json({
                error: false,
                rows: data
            })
        }).catch((err) => {
            console.log(err)
            res.status(403).json({
                error: true,
                message: 'Forbbiden'
            })
        })
})

/* GET /shelf/:shelfid */
router.get('/:shelfid', passport.authenticate('jwt', { session: false }), validator(), (req, res) => {
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
            res.status(403).json({
                error: true,
                message: 'Forbbiden'
            })
        })
})

/* POST /shelf */
router.post('/', passport.authenticate('jwt', { session: false }), validator(), (req, res) => {
    const newValues = {
        shelf: req.body.shelf,
        icon: req.body.icon,
        id_user: req.user.user_id,
        provider: req.body.provider
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
router.put('/:shelfid', passport.authenticate('jwt', { session: false }), validator(), (req, res) => {
    db.table('mmb_shelf').count().where('id_user', req.user.user_id).andWhere('shelf_id', req.params.shelfid).then(data => {
        if (data.length === 1) {
            const newValues = {
                shelf: req.body.shelf,
                icon: req.body.icon,
                provider: req.body.provider
            }
            db.table('mmb_shelf').update(newValues).where('shelf_id', +req.params.shelfid).then(data => {
                res.status(200).json({
                    error: false,
                    message: 'Shelf successfully updated'
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
})

/* DELETE /shelf/:shelfid */
router.delete('/:shelfid', passport.authenticate('jwt', { session: false }), validator(), (req, res) => {
    db.table('mmb_shelf').count().where('id_user', req.user.user_id).andWhere('shelf_id', req.params.shelfid).then(data => {
        if (data.length === 1) {
            db.table('mmb_shelf').delete().where('shelf_id', +req.params.shelfid).then(data => {
                res.status(200).json({
                    error: false,
                    message: 'Shelf successfully deleted'
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
})

module.exports = router