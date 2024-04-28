import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import hbs from 'hbs';
import { geocodePromisified } from './utilities/geocode.js';
import { forecastPromisified } from './utilities/forecast.js';
import { error } from 'console';
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Defined paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Amirali Daliri'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Amirali Daliri'
    })
})



app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Amirali Daliri',
        helpText: 'This is some koso sher'
    })
})

app.get('/weather', async (req, res) => {
    try {
        if (!req.query.search) throw Error('Please provide a search term');
        let { latitude, longitude, location } = await geocodePromisified(req.query.search);
        let forecastData = await forecastPromisified(latitude, longitude);
        return res.send({
            forecast: forecastData,
            location,
            address: req.query.search
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Amirali Daliri',
        title: 'Error 404. Page not found!',
        errorMessage: 'Help article not found!'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        name: 'Amirali Daliri',
        title: 'Error 404',
        errorMessage: 'Page not found!'

    })
})
// Start up server
app.listen(3000, () => console.log('Server is up and running on port 3000!'))