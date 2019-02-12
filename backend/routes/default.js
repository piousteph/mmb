const express = require('express')
const router = express.Router()

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

module.exports = router
