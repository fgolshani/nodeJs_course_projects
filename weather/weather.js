const request = require('request');

module.exports.getWeather = (lat, lng, callback) => {
  request({
    url:`https://api.darksky.net/forecast/b5d0c7a02184fe6c5ca21a98952ef592/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if(error){
      callback(error, undefined);
    }else if(response.statusCode == 400){
      callback("Invalid address", undefined)
    }else if(response.statusCode == 200){
      callback(undefined, {
        temp: body.currently.temperature,
        summary: body.currently.summary
      })

    }
  })
}
