const path = require('path')
const express = require('express')
const hbs = require ('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// setuo handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'sharanya'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Sharanya'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext:  'This is some text',
        title: 'help',
        name: 'Sharanya'
        
    })
})
app.get('/weather', (req, res) => {
    if(! req.query.address) {
        return res.send({
            error: 'You must give an address'
        
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }= {}) => {
        // if (error) {
        //     return res.send({error})

        // }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            } 
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            
            })
        })
    })
})

app.get('/products', (req, res) =>{
    if(! req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        
        })

    }
    console.log(req.query.search)
    res.send({
        products: []
    
    })
   
})

  
app.get('/help/*',(req, res)=> {
    res.render('404', {
        title: '404',
        name: 'Sharanya',
        errorMsg: 'Help article not found'
    })

})

app.get('*',(req, res)=> {
    res.render('404', {
        title: '404',
        name: 'Sharanya',
        errorMsg: 'Page not found'
    })

})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})
