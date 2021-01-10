const validation = require("./argumentValidation.js");

const options = {
  argumentType: 'arrayOfNumbersAndNumber',
}

module.exports = function (nums, target) {
  validation(options, ...arguments);  

  let resultIndex;

  nums.some((element, index) => {
    if (element >= target) {
      resultIndex = index;
      return true;
    }
  })

  return resultIndex ?? nums.length;
}