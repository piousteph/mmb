const express = require('express')
const router = express.Router()
const config = require('../modules/common/config')
const passport = require('../modules/common/passport')
const jwt = require('jsonwebtoken')
const Shelf = require('../models/shelf')

/* GET /shelf */
router.get('/', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* GET /shelf/:shelfid */
router.get('/:shelfid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* POST /shelf */
router.post('/', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* PUT /shelf/:shelfid */
router.put('/:shelfid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* DELETE /shelf/:shelfid */
router.delete('/:shelfid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

module.exports = router