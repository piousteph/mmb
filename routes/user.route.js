const express = require('express')
const router = express.Router()
const config = require('../modules/common/config')
const passport = require('../modules/common/passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

/* GET /user */
router.get('/', passport.authenticate('jwt', { session: false }) , (req, res) => { 

})

/* GET /user/:userid */
router.get('/:userid', passport.authenticate('jwt', { session: false }) , (req, res) => { 

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
router.post('/login', (req, res) => { 

})

/* GET /user/logout */
router.GET('/logout', (req, res) => { 

})

module.exports = router
