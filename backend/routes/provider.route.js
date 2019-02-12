const express = require('express')
const router = express.Router()
const passport = require('../modules/common/passport')

/* GET /provider */
router.get('/', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* GET /provider/:providerid */
router.get('/:userid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* POST /provider */
router.post('/', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* PUT /provider/:providerid */
router.put('/:providerid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* DELETE /provider/:providerid */
router.delete('/:providerid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* POST /provider/:providerid/search */
router.post('/:providerid/search', (req, res) => { 

})

module.exports = router
