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

app.use(Express.static('public'))

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', req.headers.origin)
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//     next()
// })
/* JWT Management */
const passport = require('./modules/common/passport')
app.use(passport.initialize())

app.use(function(req, res, next) {
    console.log('Route', req.method, req.originalUrl)
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD')
    next()
})

/* Routes Management */
const unauthenticatedRoute = require('./routes/unauthenticated.route')
const mediaRoute = require('./routes/media.route')
const shelfRoute = require('./routes/shelf.route')
const userRoute = require('./routes/user.route')

app.use('/', unauthenticatedRoute)
app.use('/media', mediaRoute)
app.use('/shelf', shelfRoute)
app.use('/user', userRoute)

module.exports = app
