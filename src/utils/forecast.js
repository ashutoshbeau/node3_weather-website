const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    url = 'https://api.darksky.net/forecast/617de0ca921048278981c1517612c21d/'+latitude +','+ longitude+'?units=si&lang=en'
    request({url, json: true}, (error, {body})=>{//response, then response.body
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }
        else if(body.error){
            callback('Unable to find location!', undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipIntensity+'% chance of rain. The wind-speed for this location is:'+body.currently.windSpeed)
        }
    }) 
}

module.exports = forecast