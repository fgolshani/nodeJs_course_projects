const request = require('request');

module.exports.geometry = (address) => {
  return new Promise((resolve, reject) => {
  request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json:true
  }, (error, response, body) => {
    if(error){
      console.log("Error happend !!");
      reject("Error happend !!");
    }else if(body.status == "ZERO_RESULTS"){
      // console.log("invalid address")
      reject("invalid address");
    }else if(body.status == "OK"){
      let lat = body.results[0].geometry.location.lat;
      let lng = body.results[0].geometry.location.lng;
      resolve({lat,lng});
    }
  })
});
}
