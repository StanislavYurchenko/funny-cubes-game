const validation = require("./argumentValidation.js");

const options = {
  argumentType: 'number',
}

module.exports = function(number) {
  validation(options, ...arguments);

  return number
    .toString()
    .split('')
    .every((element, index, array) => {
    if (index > array.length / 2) return true;
    return element === array[array.length - 1 - index]
  });


}



