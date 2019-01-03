const config = require('./config')
const dateFormat = require('dateformat')

function getCaller() {
    let er = new Error()

    let stack = er.stack || ''
    let file
    let line
    let col

    stack = stack.split(/\n/)
    for (let i = 1, l = stack.length; i < l; i++) {
        let s = stack[i].match(/\(([^):]+):([0-9]+):([0-9]+)\)$/)
        if (!s) {
            continue
        }
        file = s[1]
        line = +s[2]
        col = +s[3]

        if (file.indexOf(__dirname) !== 0) {
            break
        }
    }
    let res = {}

    if (file && file !== __filename && !file.match(/tap-test\/test.js$/)) {
        res.file = file
        res.line = line
        res.column = col
    }

    res.stack = stack.slice(1).map(function (s) {
        return s.replace(/^\s*at\s*/, '')
    })
    return res
}

module.exports = {
    log: function (...args) {
        let time = dateFormat(Date.now(), 'HH:MM:ss')
        let stack = getCaller().stack[2]
        let msg = '[' + time + '] [' + stack.slice(-30) + ']'
        args.unshift(msg)

        if (config.log.enable === true) {
            console.log.apply(console, args)
        }
    }
}
