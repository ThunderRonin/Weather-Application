import request from 'postman-request';
const geocodePromisified = (address) => {
    return new Promise((resolve, reject) => {
        const url = 'https://us1.locationiq.com/v1/search?key=pk.93fc993aa9944a8d0c47e182b3699fc1&q=' + encodeURIComponent(address) + '&format=json&limit=1'
        request({ url, json: true }, (error, response) => {
            if (error) {
                reject('Unable to connect to location service!')
            } else if (response.body.error) {
                reject('Unable to find location. Try another search.')
            } else {
                resolve({
                    latitude: response.body[0].lat,
                    longitude: response.body[0].lon,
                    location: response.body[0].display_name
                })
            }
        })
    })
}






export { geocodePromisified };