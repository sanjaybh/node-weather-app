const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forcast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup "handlebars engine" and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup statis directory to serve
app.use(express.static(publicDirPath))

//Setting up Routes
app.get('', (req, res) => {
    res.render('index.hbs', {
        title : "Weather",
        name : 'Samarth Bhan'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title : "About Me",
        name : 'Samarth Bhan',
        description: `<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`    
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        title : "Help",
        contactNo : "91-9891295811",
        name: 'Samarth Bhan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){ 
        return res.send({
            error: 'You must provide a address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if(error) {
            return res.send({ error });
        }
        forcast(`${longitude}, ${latitude}`, (error, { country, region, weatherDesc, temperature, feelslike} = {} ) =>{
            if(error){
                return res.send({ error });
            }
    
            // console.log(`We are in "${location}" of "${country}" country in region "${region}"`)
            // console.log(`${weatherDesc} :- It is currently ${temperature} degrees out. It feels like ${feelslike} degree out.`)
            
            res.send({
                forecast: weatherDesc,
                location,
                address: req.query.address,
                country,
                region,
                temperature,
                feelslike
            })
        })
    })     
})

app.get('/products', (req, res) => {
    if(!req.query.search){ 
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page.hbs', {
        title : "404",
        errorMsg: "Help article not found",
        name: 'Samarth Bhan'
    })
})

app.get('*', (req, res) => {
    res.render('404page.hbs', {
        title : "404",
        errorMsg: "Page not found",
        name: 'Samarth Bhan'
    })
})

//listening on a port after sever is ready
app.listen(port, ()=>{
    console.log("Server is up on the port "+port)
})




