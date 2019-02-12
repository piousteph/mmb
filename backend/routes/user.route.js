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
router.get('/', passport.authenticate('jwt', { session: false }) , (req, res) => { 
    if (user.isAdmin(req.user)) {
        db.select(['uuid', 'email', 'user', 'id_profile', 'profile'])
            .from('mmb_user')
            .innerJoin('mmb_profile','id_profile', 'upid')
            .then((data) => {
            let result = []
            for (let i = 0; i < data.length; ++i) {
                result.push({
                    id: data[i].uuid,
                    email: data[i].email,
                    user: data[i].user,
                    id_profile: data[i].upid,
                    profile: data[i].profile
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
router.get('/:userid', validator(), passport.authenticate('jwt', { session: false }) , (req, res) => { 
    if (user.isAdmin(req.user) || +req.user.id === +req.params.userid) {
        db.select(['uuid', 'email', 'user', 'id_profile', 'profile'])
            .from('mmb_user')
            .innerJoin('mmb_profile','id_profile', 'upid')
            .where('uuid', req.params.userid)
            .then(data => {
            let result = []
            for (let i = 0; i < data.length; ++i) {
                console.log(data[i])
                result.push({
                    id: data[i].uuid,
                    email: data[i].email,
                    user: data[i].user,
                    id_profile: data[i].upid,
                    profile: data[i].profile
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
router.post('/', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* PUT /user/:userid */
router.put('/:userid', passport.authenticate('jwt', { session: false }) , (req, res) => { 
    if (user.isAdmin(req.user)) {
        // let data = {
        //     id: req.body.id,
        //     name
        // data.id = req.query.userid
        // let user = new UserMod
        user.set(req.body)
        user.save()
        res.status(200).json({
            error: false,
            message: 'User successfully updated'
        })
    } else {
        res.status(401).json({
            error: true,
            message: 'Unthorized'
        })
    }
})

/* DELETE /user/:userid */
router.delete('/:userid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* POST /user/login */
router.post('/login', validator(), (req, res) => { 
    db.select(['uuid', 'email', 'user', 'password_digest', 'upid', 'profile'])
        .from('mmb_user')
        .innerJoin('mmb_profile','id_profile', 'upid')
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
                    id: data[0].uuid,
                    email: data[0].email,
                    user: data[0].user,
                    id_profile: data[0].upid,
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
router.get('/logout', (req, res) => { 

})

module.exports = router
