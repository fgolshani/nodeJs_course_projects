// let somePromise = new Promise((resolve, reject) => {
//   reject("promise works !");
// });
//
// somePromise.then((message) => {
//   console.log(message);
// }, (message) => {
//   console.log("error happend");
//   // console.log(message);
// })

let asyncAdd = (a,b) => {
  return new Promise ((resolve, reject) => {
    if(typeof a == "number" && typeof b == "number"){
      resolve(a+b);
    }else{
      reject("Enter a number");
    }
  })
}

asyncAdd(2,3).then((result) => {
  console.log(`result is ${result}`);
  return asyncAdd(result,3);
}, (error) => {
  console.log(error)
}).then((result) => {
  console.log(`result is ${result}`);
}, (error) => {
  console.log(error);
})
