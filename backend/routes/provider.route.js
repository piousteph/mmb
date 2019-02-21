const express = require('express')
const router = express.Router()
const db = require('../modules/common/database')
const validator = require('../modules/common/validator')
const passport = require('../modules/common/passport')


/* GET /provider */
router.get('/', passport.authenticate('jwt', { session: false }), validator(), (req, res) => { 

})

/* GET /provider/:providerid */
router.get('/:userid', passport.authenticate('jwt', { session: false }), validator(), (req, res) => { 

})

/* POST /provider */
router.post('/', passport.authenticate('jwt', { session: false }), validator(), (req, res) => { 

})

/* PUT /provider/:providerid */
router.put('/:providerid', passport.authenticate('jwt', { session: false }), validator(), (req, res) => { 

})

/* DELETE /provider/:providerid */
router.delete('/:providerid', passport.authenticate('jwt', { session: false }), validator(), (req, res) => { 

})

/* POST /provider/:providerid/search */
router.post('/:providerid/search', passport.authenticate('jwt', { session: false }), validator(), (req, res) => { 

})

module.exports = router
