const express = require('express')
const router = express.Router()
const validator = require('../modules/common/validator')
const passport = require('../modules/common/passport')

const providers = require('../modules/provider')
/* GET / */
router.get('/', passport.authenticate('jwt', { session: false }), validator(), (req, res) => {
    res.status(200).json({
        error: false,
        message: 'OK',
        providers: providers.getProviders(),
        profiles: [
            { value: '1', title: 'Administrateur' },
            { value: '2', title: 'Utilisateur' }
        ]
    })
})

module.exports = router