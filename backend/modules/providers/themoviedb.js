/* 
INFO : https://developers.themoviedb.org/3/search/search-movies

Search Movies
GET /search/movie
Query String
api_key         string      required
language        string      optional
query           string      required
page            integer     optional    default: 1
include_adult   boolean     optional    default
region          string      

*/
const dotenv = require('dotenv')
dotenv.config()
const request = require('request-promise')

const mainURL = process.env.TMDB_URL
const APIKEY = process.env.TMDB_KEY

module.exports = {
    id: '1',
    name: 'Themoviedb.org',

    search: (query) => {
        const fullURL = mainURL + '?api_key=' + APIKEY + '&query=' + encodeURIComponent(query) + '&language=fr-FR'
        const result = []
        return request.get(fullURL).then((data) => {
            const jdata = JSON.parse(data)
            console.log(jdata)
            console.log(jdata.results)
            if (jdata.hasOwnProperty('results')) {
                for (const res of jdata.results) {
                    if (res.image_path !== null) {
                        result.push({
                            id: res.id,
                            title: res.title,
                            image_path: res.poster_path
                        })
                    }
                }
            }
            return result
        })
    }
}