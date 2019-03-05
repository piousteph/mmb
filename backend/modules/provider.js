const fs = require('fs')

const normalizedPath = require('path').join(__dirname, '../modules/providers')

module.exports = {
    getProviders: () => {
        const result = []
        fs.readdirSync(normalizedPath).forEach(function(file) {
            const provider = require("../modules/providers/" + file)
            result.push({
                value: provider.id,
                title: provider.name
            })
        })
        return result
    },

    getProviderById: (id) => {
        let result = ''
        fs.readdirSync(normalizedPath).forEach(function(file) {
            const provider = require("../modules/providers/" + file)
            if (provider.id === id) {
                result = file
            }
        })
        return result
    }
}

// export const providersList = [
//     { value: '1', title: 'Amazon (DVD/BluRay)'},
//     { value: '2', title: 'Amazon (Livres)'},
//     { value: '3', title: 'TheMovieDatabase'}
//   ]