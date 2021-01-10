const validation = require("./argumentValidation.js");

const options = {
  argumentType: 'arrayOfNumbers',
}

module.exports = function(arr1, arr2) {
  validation(options, ...arguments);

  const stack1 = [];
  const stack2 = [];

  arr2.forEach(mask => {
    arr1.forEach(element => element === mask && stack1.push(element))
  })

  arr1.forEach(element => !arr2.includes(element) && stack2.push(element));
  stack2.sort((a, b) => a - b);

  return [...stack1, ...stack2];
}

