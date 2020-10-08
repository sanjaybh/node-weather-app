const request = require('request');

const forecast = (geoAddress, callback) => {
    const KEY = "760270c229998bb8c89eb4865023e074";
    const units = "m" //f, m, s
    const forcastURL = `http://api.weatherstack.com/current?access_key=${KEY}&query=${geoAddress}&units=${units}`

    request({url: forcastURL, json:true}, (error, {body} )=> {
        if(error){
            callback('Unable to connect to location service.', undefined);
        } else if(body.error){
            callback('Unable to find location. Try another search.', undefined);
        } else {
            //console.log("Res -> "+JSON.stringify(body))
            callback(undefined, {
                query : body.request.query,
                language: body.request.language,
                unit: body.request.unit,

                country : body.location.country,
                name : body.location.name,
                timezone_id : body.location.timezone_id,
                localtime : body.location.localtime,
                region : body.location.region,

                temperature : body.current.temperature,
                feelslike : body.current.feelslike,
                weather_icons: body.current.weather_icons,
                humidity: body.current.humidity,
                body: body,
                weatherDesc : body.current.weather_descriptions[0]
            });
        }
    })
}

module.exports = forecast;