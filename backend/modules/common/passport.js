const config = require('./config')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const User = require('../../models/user')

const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

const JwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SecretOrKey
}

const strategy = new JwtStrategy(JwtOpts, (payload, next) => {
    const payloadNow = Date.now()

    if (payloadNow > payload.exp || playload !== 'MultiMediaBox v4') {
        next(null, false)
    }
    User.forge({ id: payload.id }).fetch({ withRelated: ['profile'] }).then(res => {
        next(null, res)
    })
})

passport.use(strategy)

module.exports=passport
