const express = require('express')
const router = express.Router()
const db = require('../modules/common/database')
const config = require('../modules/common/config')
const validator = require('../modules/common/validator')
const security = require('../modules/common/security')
const jwt = require('jsonwebtoken')

/* POST /user/login */
router.post('/user/login', validator(), (req, res) => {
    db.select(['user_id', 'email', 'user', 'password_digest', 'profile_id', 'profile'])
        .from('mmb_user')
        .innerJoin('mmb_profile', 'id_profile', 'profile_id')
        .where('email', req.body.email)
        .then(data => {
            if (data.length === 0) {
                return res.status(401).json({
                    error: true,
                    message: 'Unauthorized'
                })
            }
            security.authenticate(data[0], req.body.password).then(authenticated => {
                if (authenticated) {
                    const payload = {
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24h
                        user_id: data[0].user_id,
                        email: data[0].email,
                        user: data[0].user,
                        profile_id: data[0].profile_id,
                        profile: data[0].profile
                    }
                    const token = jwt.sign(payload, config.SecretOrKey)
                    res.status(200).json({
                        error: false,
                        message: 'Authenticated',
                        token: token
                    })
                } else {
                    return res.status(401).json({
                        error: true,
                        message: 'Unauthorized'
                    })
                }
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    error: true,
                    message: err
                })
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: true,
                message: err
            })
        })
})

module.exports = router
