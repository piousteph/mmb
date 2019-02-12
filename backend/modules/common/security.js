const bcrypt = require('bcrypt')

module.exports = {
    hashPassword: (password) => {
        return new Promise((resolve, reject) =>
            bcrypt.hash(password, 10, (err, hash) => {
                err ? reject(err) : resolve(hash)
            })
        )
    },

    authenticate: (payload, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, payload.password_digest, (err, response) => {
                if (!err) {
                    delete payload.password_digest
                    resolve(response)
                } else {
                    console.log(err)
                    reject(null)
                }
            })
        })
    }
}
