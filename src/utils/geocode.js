const request = require('request')

const geocode = (address, callback)=>{
    url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXNodXRvc2gxIiwiYSI6ImNrMWhva3N6cjA2aDczZHJwd3lndGdtM2EifQ.Q4r_s9XVbD8OOJaLgIGkCQ&limit=1'
    request({url, json: true}, (error, { body })=>{// from the response object we require only the body, so it is accessed
        if(error){
            callback('Unable to connect to weather services.', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location try another search.', undefined)
        }else{
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }

    })
}

module.exports= geocode