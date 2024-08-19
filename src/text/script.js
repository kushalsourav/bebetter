// function debouce(func, timeout = 300) {
//    let timer; 
//    return (() => {
//     console.log()
//     clearTimeout(timer);
//      timer = setTimeout(() => func.apply(this), timeout)
//    })
// }

// function saveInput() {
//     console.log("save Data");
// }

// const processChange =  debouce(() => saveInput())

// const module = {
//     x: 42,
//     getX: function () {
//       return this.x;
//     },
//   };

//   const unboundGetX = module.getX;
// const bounded = unboundGetX.bind(module)
//   console.log(unboundGetX(), bounded()); // The function gets invoked at the global scope
//   // Expected output: undefined
  
//   const boundGetX = unboundGetX.bind(module);

//   console.log(boundGetX());
// console.log("heloo world")

// output.js
import {myInstance} from "./one.js"

myInstance.display(); // Should print 'Hello, World!' to the console

fdgfdgdfgfggggg