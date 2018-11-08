const config = require('./config')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const User = require('../../Models/User')

const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

const JwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SecretOrKey
}

const strategy = new JwtStrategy(JwtOpts, (payload, next) => {
    User.forge({ id: payload.id }).fetch().then(res => {
        next(null, res)
    })
})

passport.use(strategy)

module.exports=passport
