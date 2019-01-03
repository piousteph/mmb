const config = require('./modules/common/config')
const db = require('knex')(config.database)
const fs = require('fs')

function execQuery(sql) {
    let query = db.raw(sql)
    return query.then(data => {
        return true
    }).catch(err => {
        console.log(query.toString())
        console.log(err)
        return false
    })
}

async function runQueries() {
    let nbError = 0
    const lines = fs.readFileSync('./schema.sql').toString().split(';')
    console.log('Rebuilding database with', lines.length, 'queries')
    for (let i in lines) {
        if (await execQuery(lines[i]) === true) {
            process.stdout.write('.')
        } else {
            process.stdout.write('X')
            nbError++
        }
    }
    return nbError
}

runQueries().then(data => {
    if (data === 0) {
        console.log(' Done without error')
        process.exit(0)
    } else {
        console.log(' Done with ', data, 'error(s)')
        process.exit(1)
    }
})
