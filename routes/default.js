const express = require('express')
const router = express.Router()
const config = require('../modules/common/config')
const passport = require('../modules/common/passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.get('/', (req, res) => {
    res.send(`<form action="/seeduser" method="post">
        <input type="text" name="email" value="email">
        <input type="text" name="password" value="pass">
        <input type="submit">
    </form>`)
})

/* Create user in database */
router.post('/seeduser', (req, res) => {

    if(!req.body.email || !req.body.password) {
        return res.status(401).send('missing field')
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    user.save().then(() => {
        res.send('ok')
    }).catch(err => {
        console.log('ERROR:', err)
        res.send(err.err)
    })
})

/* Check JWT */
router.get('/protected', passport.authenticate('jwt', { session: false }) , (req, res) => {
    res.send('PROTECTED')
})

/* Return JWT */
router.post('/getToken', (req, res) => {
    if(!req.body.email || !req.body.password) {
        return res.status(401).send('missing field')
    }

    User.forge({ email: req.body.email }).fetch().then(result => {
        if (!result) {
            return res.status(400).send(('user not found'))
        }

        result.authenticate(req.body.password).then(user => {
            const payload = { id: user.id }
            const token = jwt.sign(payload, config.SecretOrKey)
            res.send(token)
        }).catch(err => {
            res.status(401).send('err:', err)
        })
    })
})
module.exports = router
