import request from 'postman-request';
const forecastPromisified = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        const url = 'http://api.weatherstack.com/current?access_key=6fa12fd695e1fa07104a572aab0fd0b4&query=' + latitude + ',' + longitude
        request ({ url, json: true }, (error, response) => {
            if (error) {
                reject('Unable to connect to the weather services!')
            } else if (response.body.error) {
                reject('Unable to find location.')
            } else {
                resolve(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees outside. It feels like ${response.body.current.feelslike} outside.`)
            }
        })
    })
}
export { forecastPromisified }