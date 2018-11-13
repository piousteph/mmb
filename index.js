const Express = require('express')
const Helmet = require('helmet')
const bodyParser = require('body-parser')
const app = Express()

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(Express.json({
    limit: '50mb'
}))
app.use(Express.urlencoded({
    extended: true,
    limit: '50mb'
}))

app.use(Helmet())

/* JWT Management */
const passport = require('./modules/common/passport')
app.use(passport.initialize())

/* Routes Management */
const defaultRoute = require('./routes/default')
const mediaRoute = require('./routes/media.route')
const shelfRoute = require('./routes/shelf.route')
const userRoute = require('./routes/user.route')

app.use('/', defaultRoute)
app.use('/media', mediaRoute)
app.use('/shelf', shelfRoute)
app.use('/user', userRoute)

module.exports = app
