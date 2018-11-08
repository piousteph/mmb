const express = require('express')
const router = express.Router()
const config = require('../modules/common/config')
const passport = require('../modules/common/passport')
const jwt = require('jsonwebtoken')
const Media = require('../models/media')

/* GET /media */
router.get('/', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* GET /media/:mediaid */
router.get('/:mediaid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* POST /media */
router.post('/', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* PUT /media/:mediaid */
router.put('/:mediaid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* DELETE /media/:mediaid */
router.delete('/:mediaid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* POST /media/:mediaid/lending */
router.post('/:mediaid/lending', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})
