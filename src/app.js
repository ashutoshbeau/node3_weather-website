const path =require('path')
const express = require('express')
const hbs = require('hbs')// for partials
geocode = require('./utils/geocode')
forecast = require('./utils/forecast')

//both of these values are provided by wrapper function.
const app = express()
console.log(__dirname) //console.log(__filename)
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')//__dirname gives the path to the folder in which this current file exists
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {//for index.hbs file
    res.render('index', {
        title: 'Weather App',
        name: 'Ashutosh Kumar Singh'
    })
})
app.get('/about', (req, res) => {//for index.hbs file
    res.render('about',{
        title: 'About my teacher',
        name:'Ashutosh with help of Andrew'
    })
})
app.get('/help', (req, res) =>{
    res.render('help',{
        example: '9804734201',
        title: 'Help',
        name:'Ashutosh'
    })
})

app.get('/weather', (req, res)=>{/*Query String*/
    if(!req.query.address){
        return res.send({
            error: 'You must provide a valid address!'
        })
    }
    geocode(req.query.address, (error, {location, latitude, longitude} = {})=>{/*error & data; = {} as default value of object*/
        if(error){
            return res.send({error})
        }
        // console.log('Error:',error)
        // console.log('Data:',data)
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            // console.log('Error:', error)
            // consol e.log(location)
            // console.log(forecastData)
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
          })
        
    })
    // console.log(req.query)
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'West Bengal',
    //     address: req.query.address
    // })
    
}) 

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({// without return, the two response error are thrown.*/
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({/*When two response are sent at a time, then this error message shows up Cannot set headers after they are sent to the client.*/
        products:[]
    })
})
app.get('/help/*', (req, res) =>{
    res.render('handle',{
        title: 'Help page 404',
        name: 'Ashutosh Kumar Singh',
        err:'Help article not found!',

    })
})

app.get('*', (req, res) =>{//Generic 404
    res.render('handle',{
        title: '404',
        name: 'Ashutosh Kumar Singh',
        err: 'My 404 page!'
    })
})



const previousCode1= ()=>{
    // app.get('', (req, res)=>{// 1.
//     res.send('<title>Hello express!</title>')
// }) since its work is done by app.use
 
// app.get('/help', (req, res)=>{// 2.
//     res.send({
//         name:'Ashutosh',
//         age: 20
//     })
// }) 

// app.get('/about', (req, res)=>{// 3.
//     res.send({
//         forecast: 'Day',
//         location: 'Liluah'
//     })
// }) 
}

// using this we can send back html as well as json.
// express can be used to serve up the html directory, images, videos, css, javascript and many more.
//1. app.com'' 
//2. app.com'/help'
//3. app.com'/about'

app.listen(port, ()=>{
    console.log('Server is up on port '+ port)
})