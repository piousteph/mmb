const express = require('express')
const router = express.Router()
const db = require('../modules/common/database')
const config = require('../modules/common/config')
const validator = require('../modules/common/validator')
const passport = require('../modules/common/passport')
const security = require('../modules/common/security')
const jwt = require('jsonwebtoken')
const user = require('../modules/user')

/* GET /user */
router.get('/', passport.authenticate('jwt', {
    session: false
}), validator(), (req, res) => {
    if (user.isAdmin(req.user)) {
        db.select(['user_id', 'email', 'user', 'id_profile'])
            .from('mmb_user')
            .then((data) => {
                let result = []
                for (let i = 0; i < data.length; ++i) {
                    result.push({
                        user_id: data[i].user_id,
                        email: data[i].email,
                        user: data[i].user,
                        id_profile: data[i].id_profile
                    })
                }
                res.status(200).json({
                    error: false,
                    rows: result
                })
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    error: true,
                    message: 'Fatal Error'
                })
            })
    } else {
        res.status(401).json({
            error: true,
            message: 'Unauthorized'
        })
    }
})

/* GET /user/:userid */
router.get('/:userid', passport.authenticate('jwt', {
    session: false
}), validator(), (req, res) => {
    if (user.isAdmin(req.user) || +req.user.id === +req.params.userid) {
        db.select(['user_id', 'email', 'user', 'id_profile'])
            .from('mmb_user')
            .where('user_id', req.params.userid)
            .then(data => {
                let result = []
                for (let i = 0; i < data.length; ++i) {
                    result.push({
                        user_id: data[i].user_id,
                        email: data[i].email,
                        user: data[i].user,
                        id_profile: data[i].id_profile
                    })
                }

                res.status(200).json({
                    error: false,
                    rows: result
                })
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    error: true,
                    message: 'Fatal Error'
                })
            })
    } else {
        res.status(401).json({
            error: true,
            message: 'Unauthorized'
        })
    }
})

/* POST /user */
router.post('/', passport.authenticate('jwt', {
    session: false
}), validator(), (req, res) => {
    if (user.isAdmin(req.user)) {
        const newValues = {
            email: req.body.email,
            user: req.body.user,
            id_profile: req.body.id_profile
        }
        db.table('mmb_user').insert(newValues).then(data => {
            res.status(201).json({
                error: false,
                user_id: data[0],
                message: 'User successfully added'
            })
        }).catch(err => {
            console.log('RATE', err)
            res.status(500).json({
                error: true,
                message: 'User not added'
            })
        })
    } else {
        res.status(401).json({
            error: true,
            message: 'Unauthorized'
        })
    }
})

/* PUT /user/:userid */
router.put('/:userid', passport.authenticate('jwt', {
    session: false
}), validator(), (req, res) => {
    if (user.isAdmin(req.user)) {
        const newValues = {
            email: req.body.email,
            user: req.body.user,
            id_profile: req.body.id_profile
        }
        db.table('mmb_user').update(newValues).where('user_id', +req.params.userid).then(data => {
            res.status(200).json({
                error: false,
                message: 'User successfully updated'
            })
        }).catch(err => {
            console.log('RATE', err)
            res.status(500).json({
                error: true,
                message: 'User not updated'
            })
        })
    } else {
        res.status(401).json({
            error: true,
            message: 'Unthorized'
        })
    }
})

/* DELETE /user/:userid */
router.delete('/:userid', passport.authenticate('jwt', {
    session: false
}), validator(), (req, res) => {
    if (user.isAdmin(req.user) && req.params.userid !== req.user.uuid) {
        db.table('mmb_user').delete().where('user_id', +req.params.userid).then(data => {
            res.status(200).json({
                error: false,
                message: 'User successfully deleted'
            })
        }).catch(err => {
            console.log('RATE', err)
            res.status(500).json({
                error: true,
                message: 'User not deleted'
            })
        })
    } else {
        res.status(401).json({
            error: true,
            message: 'Unauthorized'
        })
    }
})

/* POST /user/login */
router.post('/login', validator(), (req, res) => {
    db.select(['user_id', 'email', 'user', 'password_digest', 'profile_id', 'profile'])
        .from('mmb_user')
        .innerJoin('mmb_profile', 'id_profile', 'profile_id')
        .where('email', req.body.email)
        .then(data => {
            if (data.length === 0) {
                return res.status(401).json({
                    error: true,
                    message: 'Unauthorized'
                })
            }
            security.authenticate(data[0], req.body.password).then(authenticated => {
                if (authenticated) {
                    const payload = {
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24h
                        user_id: data[0].user_id,
                        email: data[0].email,
                        user: data[0].user,
                        profile_id: data[0].profile_id,
                        profile: data[0].profile
                    }
                    const token = jwt.sign(payload, config.SecretOrKey)
                    res.status(200).json({
                        error: false,
                        message: 'Authenticated',
                        token: token
                    })
                } else {
                    return res.status(401).json({
                        error: true,
                        message: 'Unauthorized'
                    })
                }
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    error: true,
                    message: err
                })
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: true,
                message: err
            })
        })
})

/* GET /user/logout */
router.get('/logout', validator(), (req, res) => {

})

module.exports = router
