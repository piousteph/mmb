const express = require('express')
const router = express.Router()
const config = require('../modules/common/config')
const validator = require('../modules/common/validator')
const passport = require('../modules/common/passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

/* GET /user */
router.get('/', passport.authenticate('jwt', { session: false }) , (req, res) => { 
    res.send(req.user.attributes)
})

/* GET /user/:userid */
router.get('/:userid', validator(), passport.authenticate('jwt', { session: false }) , (req, res) => { 
    User.forge({ id: req.params.userid }).fetch({ withRelated: ['profile'] }).then(data => {
        res.status(200).json({ 
            error: false,
            data: {
                email: data.attributes.email,
                name: data.attributes.name,
                profile: data.related('profile').attributes.name
            }
        })
    }).catch(err => {
        res.status(500).json({
            error: true,
            message: 'Fatal Error'
        })
    })
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
    User.forge({ email: req.body.email }).fetch().then(data => {
        if (!data) {
            return res.status(401).json({
                error: true,
                message: 'Unthorized'
            })
        }

        data.authenticate(req.body.password).then(user => {
            const payloadNow = Date.now()

            const payload = { 
                id: user.id,
                profile: user.related('profile').attributes.name,
                exp: payloadNow + (24 * 60 * 60 * 1000),
                iat: payloadNow,
                iss: 'MultiMediaBox v4'
            }
            const token = jwt.sign(payload, config.SecretOrKey)
            res.status(200).json({
                error: false,
                message: 'Authenticated', 
                token: token
            })
        }).catch(err => {
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
