const request = require('request')

const forecast = (latitude,longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=96e15a6c70a9d93927d8c521e5fa6ee0&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            const t = body.current.temperature
            const p = body.current.precip
            callback(undefined, body.current.weather_descriptions[0] + '.It is currently '+ t + ' degree celcius.There is a '+ p + '% chance of rainfall')


        }


    })
}

module.exports = forecast