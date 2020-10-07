const request = require('request');

const geoCode = (address, callback) => {
    const adres = encodeURIComponent(address);
    const access_token = 'pk.eyJ1Ijoic2FuamF5YmgiLCJhIjoiY2tmdzU2NWgxMTkxczJxbHJxNjBiM3I2dSJ9.cCsr3l0GWEScq3Ds7FAaFQ';
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adres}.json?access_token=${access_token}&limit=1`

    request({url: geocodeURL, json: true}, (error, { body } )=> {
        if(error){
            callback('Unable to connect to location service.', undefined);
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name
            });
        }
    })
}

module.exports = geoCode;