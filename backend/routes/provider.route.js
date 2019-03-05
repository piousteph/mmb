const express = require('express')
const router = express.Router()
const validator = require('../modules/common/validator')
const passport = require('../modules/common/passport')
const providers = require('../modules/provider')

/* GET /provider/:providerid */
router.get('/:providerid', passport.authenticate('jwt', { session: false }), validator(), (req, res) => {
    try {
        const file = providers.getProviderById(req.params.providerid)
        const provider = require("../modules/providers/" + file)
        provider.search(req.query.title).then(data => {
            res.status(200).json({
                error: false,
                message: 'OK',
                data: data
            })
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
