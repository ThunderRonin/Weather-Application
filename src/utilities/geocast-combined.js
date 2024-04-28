import { geocodePromisified } from './utilities/geocode.js';
import { forecastPromisified } from './utilities/forecast.js';
import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true })
const location = prompt('Enter the location: ');
async function getWholeWeather(location) {
    try {
        const coordinates = await geocodePromisified(location)
        const weatherData = await forecastPromisified(coordinates.latitude, coordinates.longitude, coordinates.location)
        return weatherData;
    } catch (error) {
        console.log('Error! ', error)
        throw error;
    }
}
export { getWholeWeather }