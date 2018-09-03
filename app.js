const request = require('request');
const geometry = require('./geometry.js');
const yargs = require('yargs');
const weather = require('./weather');

let argv = yargs.options({
  a:{
    demand: true,
    describe:"Address of your location",
    string:true
  }
})
.help()
.argv

let address = argv.a;
let encodedAddress = encodeURIComponent(address)

// geometry.geometry(encodedAddress, (error, result) => {
//   if(error){
//     console.log(error);
//   }
//   console.log(result.lat, result.lng);
//   weather.getWeather(result.lat, result.lng, (error, result) =>{
//     if(error){
//       console.log(error)
//     }else{
//       console.log(`Your current temp is ${result.temp} and your weather is ${result.summary}`)
//     }
//   })
// })

geometry.geometry(encodedAddress).then((result) => {
  console.log(result)
}, (msg) => {
  console.log(msg)
})
