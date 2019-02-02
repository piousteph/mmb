const express = require('express')
const router = express.Router()
const config = require('../modules/common/config')
const validator = require('../modules/common/validator')
const passport = require('../modules/common/passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const user = require('../modules/user')

/* GET /user */
router.get('/', passport.authenticate('jwt', { session: false }) , (req, res) => { 
    const user = req.user.toJSON()
    if (+user.id_profile === 1) {
        User.forge().fetchAll({withRelated: ['profile']}).then(data => {
            const jdata = data.toJSON()
            let result = []
            for (let i = 0; i < jdata.length; ++i) {
                result.push({
                    email: jdata[i].email,
                    name: jdata[i].name,
                    profile: jdata[i].profile.name
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
            message: 'Unthorized'
        })
    }
})

/* GET /user/:userid */
router.get('/:userid', validator(), passport.authenticate('jwt', { session: false }) , (req, res) => { 
    const user = req.user.toJSON()
    if (+user.id_profile === 1 || +user.id === +req.params.userid) {
        User.forge({ id: req.params.userid }).fetch({ withRelated: ['profile'] }).then(data => {
            const jdata = data.toJSON()
            res.status(200).json({ 
                error: false,
                data: {
                    email: jdata.email,
                    name: jdata.name,
                    profile: jdata.profile.name
                }
            })
        }).catch(err => {
            res.status(500).json({
                error: true,
                message: 'Fatal Error'
            })
        })
    } else {
        console.log(req.user.id_profile, '===', 1, '||', +req.user.id, '===', +req.params.userid)
        console.log(req.user)
        res.status(401).json({
            error: true,
            message: 'Unthorized'
        })
    }
})

/* POST /user */
router.post('/', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* PUT /user/:userid */
router.put('/:userid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* DELETE /user/:userid */
router.delete('/:userid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* POST /user/login */
router.post('/login', validator(), (req, res) => { 
    User.forge({ email: req.body.email }).fetch({ withRelated: ['profile'] }).then(data => {
        if (!data) {
            return res.status(401).json({
                error: true,
                message: 'Unthorized'
            })
        }

        data.authenticate(req.body.password).then(user => {
            const jdata = user.toJSON()
            const payload = { 
                id: jdata.id,
                name: jdata.name,
                profile: jdata.profile.name
            }
            const token = jwt.sign(payload, config.SecretOrKey)
            res.status(200).json({
                error: false,
                message: 'Authenticated', 
                token: token
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: true,
                message: 'Fatal Error'
            })
        })
    })
})

/* GET /user/logout */
router.get('/logout', (req, res) => { 

})

module.exports = router
