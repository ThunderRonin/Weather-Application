const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', async (event) => {
    try {
        const location = search.value
        event.preventDefault()

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''
        let response = await fetch('http://localhost:3000/weather?search=' + location)
        if (response.status!= 200) throw Error(await response.text())
        let responseObject = await response.json()
        let forecast = JSON.stringify(responseObject.forecast)
        location = JSON.stringify(responseObject.location)
        messageTwo.textContent = forecast
        messageOne.textContent = location
        console.log(data)

    } catch (error) {
        messageOne.textContent = error.message
        messageTwo.textContent = ''
        console.log(error)
    }


})