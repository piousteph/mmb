const config = require('./config')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const db = require('./database')

const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

const JwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SecretOrKey
}

const strategy = new JwtStrategy(JwtOpts, (payload, next) => {
    db.select('user_id', 'email', 'id_profile')
        .from('mmb_user')
        .where('user_id', payload.user_id)
        .then(res => {
            next(null, res[0])
        }).catch((err) => {
            console.log('FATAL ERROR', err)
        })
})

passport.use(strategy)

module.exports = passport
