const express = require('express')
const router = express.Router()
const config = require('../modules/common/config')
const validator = require('../modules/common/validator')
const passport = require('../modules/common/passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

/* GET /user */
router.get('/', validator(), passport.authenticate('jwt', { session: false }) , (req, res) => { 
    const result = {}
    User.forge().fetch({ withRelated: ['profile'] }).then(data => {
        console.log(data)
        res.status(200).json({
            error: false,
            data: []
        })
    })
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
router.post('/', validator(), passport.authenticate('jwt', { session: false }) , (req, res) => { 
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    })

    user.save().then(() => {
        res.status(201).json({ 
            error: false,
            message: 'User created'
        })
    }).catch(err => {
        console.log('ERROR:', err)
        res.status(500).json({
            error: true,
            message: 'Error during create user'
        })
    })
})

/* PUT /user/:userid */
router.put('/:userid', validator(), passport.authenticate('jwt', { session: false }) , (req, res) => { 

    if (req.user.attributes.profile !== 'Administrator') {
        res.status(403).json({
            error: true,
            message: 'Forbidden'
        })
    }

    User.forge({ id: req.params.userid }).fetch({ withRelated: ['profile'] }).then(data => {
        const newData = data

        newData.name = data.attributes.name !== req.body.name ? newData.name : req.body.name
        newData.email = data.attributes.email !== req.body.email ? newData.email : req.body.email
        newData.password = data.attributes.password !== req.body.password ? newData.password : req.body.password

        const user = new User(newData)

        user.save({}, {patch: true}).then(() => {
            res.status(200).json({ 
                error: false,
                message: 'User updated'
            })
        }).catch(err => {
            console.log('ERROR:', err)
            res.status(500).json({
                error: true,
                message: 'Error during update user'
            })
    }).catch(err => {
        console.log('ERROR:', err)
        res.status(500).json({
            error: true,
            message: 'Error during update user'
    })
})

/* DELETE /user/:userid */
router.delete('/:userid', passport.authenticate('jwt', { session: false }) , (req, res) => { 
    res.status(200).json({
        error: false,
        message: 'Not implemented'
    })
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
